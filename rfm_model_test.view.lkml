
view: rfm_model_test {
  derived_table: {
    sql: SELECT
          Customer_360.email  AS customer_360_email_1,
              (Customer_360.most_recent_orderdate ) AS customer_360_most_recent_orderdate_date_1,
          COALESCE(SUM(Customer_360.total_sales ), 0) AS customer_360_total_sales_1,
          COALESCE(SUM(Customer_360.total_orders_till_date ), 0) AS customer_360_total_orders_till_date_1
      FROM `daton-375214.sakara_prod_presentation.FD_customer_360`
           AS Customer_360
      GROUP BY
          1,
          2
      ORDER BY
          3 DESC
      LIMIT 500 ;;
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

  set: detail {
    fields: [
        customer_360_email_1,
	customer_360_most_recent_orderdate_date_1,
	customer_360_total_sales_1,
	customer_360_total_orders_till_date_1
    ]
  }
}
