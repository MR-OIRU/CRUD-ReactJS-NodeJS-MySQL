import React from 'react'
import ReactApexChart from "react-apexcharts";
class ProductChart extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
      
        series: [100, 374, 526],
        options: {
          chart: {
            
            type: 'donut',
          },
          labels: ['Nike', 'Converse', 'Adidas'],
          legend: {
            labels: {
                colors: ['#FFFFFF', '#FFFFFF', '#FFFFFF'], // สีของตัวอักษรใน legend
              useSeriesColors: false // ใช้สีเดียวกันกับ series (false จะไม่ใช้สีของ series)
            },
            fontSize: '14px', // ขนาดของตัวอักษร
          },
          responsive: [{
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: 'bottom'
              }
            }
          }]
        },
      
      
      };
    }

  

    render() {
      return (
        <div>
          <div id="chart">
            <h4>1000 ชิ้น</h4>
            <ReactApexChart options={this.state.options} series={this.state.series} type="donut" />
          </div>
          <div id="html-dist"></div>
        </div>
      );
    }
  }

export default ProductChart