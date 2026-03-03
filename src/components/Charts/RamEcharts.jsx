import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

export default function RamEcharts() {
    const chartRef = useRef(null);

    useEffect(() => {
        let chartInstance;

        if (chartRef.current) {
            chartInstance = echarts.init(chartRef.current);

            const ramDataEcharts = {
                "2020": { precio: 4.50 },
                "2021": { precio: 5.15 },
                "2022": { precio: 3.90 },
                "2023": { precio: 2.60 },
                "2024": { precio: 3.10 },
                "2025": { precio: 7.50 },
                "2026": { precio: 12.50 }
            };

            const yearsEcharts = Object.keys(ramDataEcharts);
            const pricesEcharts = yearsEcharts.map(year => ramDataEcharts[year].precio);

            const optionEcharts = {
                tooltip: {
                    trigger: 'axis',
                    backgroundColor: 'rgba(255, 255, 255, 0.98)',
                    borderColor: '#ede9fe',
                    borderWidth: 1,
                    textStyle: { color: '#1e293b', fontFamily: 'Inter' },
                    padding: [16, 20],
                    formatter: function (params) {
                        return `
              <div style="font-weight:700; color:#1e293b; font-size: 15px; margin-bottom:12px; border-bottom: 1px solid #f1f5f9; padding-bottom: 8px;">
                  Año ${params[0].name}
              </div>
              <div style="display:flex; align-items: center; gap:16px;">
                  <div style="display:flex; flex-direction:column; gap:4px;">
                      <span style="font-size:12px; color:#64748b; text-transform: uppercase; font-weight: 600; letter-spacing: 0.5px;">1GB RAM</span>
                      <span style="font-size:22px; font-weight:800; color:#146B4F;">
                          $${params[0].value.toFixed(2)} <span style="font-size:14px; color:#94a3b8; font-weight:500;">USD</span>
                      </span>
                  </div>
              </div>
            `;
                    },
                    extraCssText: 'box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04); border-radius: 12px; backdrop-filter: blur(8px);'
                },
                grid: {
                    left: '2%',
                    right: '4%',
                    bottom: '2%',
                    top: '12%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: yearsEcharts,
                    axisLine: { lineStyle: { color: '#cbd5e1', width: 2 } },
                    axisLabel: { color: '#64748b', fontFamily: 'Inter', fontSize: 13, fontWeight: 500, margin: 20 },
                    axisTick: { show: false }
                },
                yAxis: {
                    type: 'value',
                    axisLabel: {
                        formatter: '${value}',
                        color: '#64748b',
                        fontFamily: 'Inter',
                        fontSize: 13,
                        fontWeight: 500,
                        margin: 16
                    },
                    splitLine: {
                        lineStyle: { color: '#f8fafc', type: 'dashed', width: 2 }
                    }
                },
                series: [
                    {
                        name: 'Precio (USD)',
                        type: 'line',
                        data: pricesEcharts,
                        smooth: 0.4,
                        symbol: 'circle',
                        symbolSize: 12,
                        showSymbol: false,
                        itemStyle: {
                            color: '#3BCF8E',
                            borderColor: '#ffffff',
                            borderWidth: 3,
                            shadowColor: 'rgba(59, 207, 142, 0.6)',
                            shadowBlur: 10
                        },
                        lineStyle: {
                            width: 5,
                            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                                { offset: 0, color: '#146B4F' },
                                { offset: 1, color: '#3BCF8E' }
                            ]),
                            shadowColor: 'rgba(20, 107, 79, 0.4)',
                            shadowBlur: 15,
                            shadowOffsetY: 8
                        },
                        areaStyle: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                { offset: 0, color: 'rgba(45, 170, 122, 0.35)' },
                                { offset: 0.8, color: 'rgba(45, 170, 122, 0.0)' }
                            ])
                        },
                        emphasis: {
                            focus: 'series',
                            itemStyle: { symbolSize: 16, borderWidth: 4, color: '#6EE7B7' }
                        }
                    }
                ]
            };

            chartInstance.setOption(optionEcharts);
        }

        const handleResize = () => chartInstance?.resize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            chartInstance?.dispose();
        };
    }, []);

    return <div ref={chartRef} className="h-80 md:h-[400px] w-full"></div>;
}
