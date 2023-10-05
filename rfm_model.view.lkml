
view: rfm_model {
  derived_table: {
    sql: WITH BASE AS (
      SELECT
          Customer_360.email  AS customer_360_email_1,
              (Customer_360.most_recent_orderdate ) AS customer_360_most_recent_orderdate_date_1,
          COALESCE(SUM(Customer_360.total_sales ), 0) AS customer_360_total_sales_1,
          COALESCE(SUM(Customer_360.total_orders_till_date ), 0) AS customer_360_total_orders_till_date_1,
          case 
            when date_diff(CURRENT_DATE,Customer_360.most_recent_orderdate,DAY) <60 THEN 1
            when date_diff(CURRENT_DATE,Customer_360.most_recent_orderdate,DAY) <211 THEN 2
            when date_diff(CURRENT_DATE,Customer_360.most_recent_orderdate,DAY) <365 THEN 3
            else 4
            end AS recency,
          case
            when     COALESCE(SUM(Customer_360.total_orders_till_date ), 0) > 10 THEN 1
            when     COALESCE(SUM(Customer_360.total_orders_till_date ), 0) > 5 THEN 2
            when     COALESCE(SUM(Customer_360.total_orders_till_date ), 0) > 1 THEN 3
            else 4
            end AS frequency,
          case
            when COALESCE(SUM(Customer_360.total_sales ), 0) > 25000 THEN 1
            when COALESCE(SUM(Customer_360.total_sales ), 0) > 10000 THEN 2
            when COALESCE(SUM(Customer_360.total_sales ), 0) > 2500 THEN 3
            else 4
            end AS monetary,
            
      FROM `daton-375214.sakara_prod_presentation.FD_customer_360`
           AS Customer_360
      GROUP BY
          1,
          2
      ORDER BY
          3 DESC)
          SELECT 
          *, CONCAT (recency,frequency,monetary) AS RFM
          from BASE ;;
  }

  measure: count {
    type: count
    drill_fields: [detail*]
  }

  dimension: customer_360_email_1 {
    type: string
    sql: ${TABLE}.customer_360_email_1 ;;
  }

  dimension: customer_360_most_recent_orderdate_date_1 {
    type: date
    datatype: date
    sql: ${TABLE}.customer_360_most_recent_orderdate_date_1 ;;
  }

  dimension: customer_360_total_sales_1 {
    type: number
    sql: ${TABLE}.customer_360_total_sales_1 ;;
  }

  dimension: customer_360_total_orders_till_date_1 {
    type: number
    sql: ${TABLE}.customer_360_total_orders_till_date_1 ;;
  }

  dimension: recency {
    type: number
    sql: ${TABLE}.recency ;;
  }

  dimension: frequency {
    type: number
    sql: ${TABLE}.frequency ;;
  }

  dimension: monetary {
    type: number
    sql: ${TABLE}.monetary ;;
  }

  dimension: rfm {
    type: string
    sql: ${TABLE}.RFM ;;
  }

  set: detail {
    fields: [
        customer_360_email_1,
	customer_360_most_recent_orderdate_date_1,
	customer_360_total_sales_1,
	customer_360_total_orders_till_date_1,
	recency,
	frequency,
	monetary,
	rfm
    ]
  }
}
