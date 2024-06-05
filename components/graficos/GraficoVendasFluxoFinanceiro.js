import {PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer} from "recharts";

function GraficoVendasFluxoFinanceiro({totalVendas}){
    const data = [
        {name:"Pix", value:(Number(totalVendas.totalPix) / Number(totalVendas.total)) * 100},
        {name:"Dinheiro", value:(Number(totalVendas.totalDinheiro) / Number(totalVendas.total)) * 100},
        {name:"Cartão", value:(Number(totalVendas.totalCartao) / Number(totalVendas.total)) * 100},
    ];
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

    return(
        <div className="d-flex flex-column align-items-center p-3" style={{width:'100%', height:'100%'}}>
            <h1>Grafico de vendas</h1>
            <p>Modalidade de pagamento</p>
            <div style={{width:'100%', height:'100%'}}>
                <ResponsiveContainer>
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => percent > 0 ? `${name}: ${(percent * 100).toFixed(0)}%` : ''}
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>

        </div>

    )
}



export default GraficoVendasFluxoFinanceiro;