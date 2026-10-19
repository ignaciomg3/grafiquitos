const branding = {
    colors: {
        brand: {
            primary: '#0f766e',
            secondary: '#0ea5e9',
            accent: '#f59e0b'
        },
        text: {
            primary: '#0f172a',
            secondary: '#334155',
            muted: '#64748b',
            inverse: '#f8fafc'
        },
        surface: {
            page: '#f3f6fb',
            card: '#ffffff',
            soft: '#eef3fb',
            border: '#d9e3f2'
        },
        section: {
            economia: '#0f766e',
            humanidades: '#be185d',
            tecnologia: '#0369a1',
            politica: '#7c3aed',
            puestos: '#b45309',
            mercado: '#1d4ed8'
        },
        states: {
            success: '#15803d',
            warning: '#b45309',
            error: '#b91c1c',
            info: '#0369a1'
        }
    },
    charts: {
        grid: '#dce3ee',
        axis: '#3d4a5c',
        tooltipBg: 'rgba(12, 22, 38, 0.94)',
        tooltipBgLight: 'rgba(255, 255, 255, 0.98)',
        tooltipBorder: 'rgba(148, 163, 184, 0.35)',
        white: '#ffffff',
        fontSizes: {
            axisTick: 17
        },
        series: ['#0ea5e9', '#14b8a6', '#22c55e', '#f59e0b', '#f97316', '#ef4444', '#8b5cf6'],
        softSeries: ['#dbeafe', '#ccfbf1', '#bbf7d0', '#fef3c7', '#ede9fe', '#fee2e2', '#ffedd5'],
        violetScale: ['#8b5cf6', '#a78bfa', '#c4b5fd', '#ede9fe'],
        humanidades: {
            mujer: '#db2777',
            hombre: '#2563eb',
            mujerFill: 'rgba(236, 72, 153, 0.1)',
            hombreFill: 'rgba(59, 130, 246, 0.1)'
        },
        economia: {
            nacimientos: '#006888',
            nacimientosBarMaxWidth: 60,
            deuda: '#be123c',
            deudaFill: 'rgba(190, 18, 60, 0.12)',
            inflacion: '#ef4444',
            inflacionFill: 'rgba(239, 68, 68, 0.1)',
            salario: '#0f766e',
            alquiler: '#ea580c',
            oilLow: '#0891b2',
            oilHigh: '#dc2626',
            oilFillLow: 'rgba(8, 145, 178, 0.12)',
            oilGradientHigh: 'rgba(220, 38, 38, 0.24)',
            oilGradientMid: 'rgba(234, 88, 12, 0.14)',
            oilGradientLow: 'rgba(8, 145, 178, 0.08)'
        },
        politica: {
            aprobacion: '#2563eb',
            desaprobacion: '#dc2626',
            bloques: ['#7c3aed', '#f59e0b', '#0284c7', '#64748b', '#0f766e', '#1e3a8a', '#b91c1c', '#075985'],
            softBloques: ['#ede9fe', '#fef3c7', '#e0f2fe', '#e2e8f0', '#ccfbf1', '#dbeafe', '#fee2e2', '#e0f2fe']
        },
        tecnologia: {
            iot: '#06b6d4',
            ram: '#00ffc6',
            ramDarkBg: 'rgba(17, 17, 17, 0.9)'
        },
        puestos: {
            demanda: '#00b0dc',
            oferta: '#8864b5',
            oportunidad: '#74bd7f',
            scatter: '#f59e0b',
            scatterFill: 'rgba(245, 158, 11, 0.7)'
        },
        gridSoft: 'rgba(51, 65, 85, 0.4)',
        topPbiCountries: ['#0a3161', '#ee1c25', '#1a1a1a', '#ff9933', '#bc002d', '#012169', '#002395']
    },
    surfaces: {
        panelGradient: {
            from: 'from-slate-50',
            via: 'via-white',
            to: 'to-blue-50/60'
        }
    }
};

export default branding;
