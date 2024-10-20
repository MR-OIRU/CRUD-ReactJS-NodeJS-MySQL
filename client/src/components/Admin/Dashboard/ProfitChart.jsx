import React from 'react'
import ReactApexChart from "react-apexcharts";
class ProfitChart extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        series: [{
          name: "Sales",
          data: [1000, 1500, 3000, 2500, 5000, 4000, 4500, 6320, 10000]
        }],
        options: {
          chart: {
            type: 'line',
            zoom: {
              enabled: false
            },
            toolbar: {
                show: true,
                offsetX: 0,
                offsetY: 0,
                style: {
                    background: '#1E1E1E', // เปลี่ยนสีพื้นหลังของ Toolbar
                    border: 'none', // สามารถกำหนดกรอบถ้าต้องการ
                }
            }
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: 'smooth', // เปลี่ยนเป็น 'smooth' เพื่อให้เส้นกราฟเรียบขึ้น
            width: 3 // ขนาดเส้นกราฟ
          },
          title: {
            text: 'Profit by Month',
            align: 'left',
            style: {
              color: '#FFFFFF', // สีของ title
              fontSize: '20px', // ขนาดตัวอักษร
              fontWeight: 'bold' // หนักของตัวอักษร
            }
          },
          xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
            labels: {
              style: {
                colors: '#FFFFFF', // สีของตัวอักษรใน categories
                fontSize: '12px' // ขนาดตัวอักษร
              }
            }
          },
          yaxis: {
            labels: {
              style: {
                colors: '#FFFFFF', // สีของตัวอักษรใน y-axis
                fontSize: '12px'
              }
            }
          },
          grid: {
            borderColor: '#e0e0e0', // สีของเส้นกริด
          },
          tooltip: {
            style: {
              fontSize: '12px',
            },
            marker: {
              show: true 
            },
            theme: 'dark',
          },
          colors: ['#FF5733'], // สีของเส้นกราฟ
        },
      };
    }

  

      render() {
        return (
          <div>
            <div id="chart">
              <ReactApexChart options={this.state.options} series={this.state.series} type="line" height={350} />
            </div>
            <div id="html-dist"></div>
          </div>
        );
      }
  }

export default ProfitChart