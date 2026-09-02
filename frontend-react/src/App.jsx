import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

function App() {
  const [records, setRecords] = useState([]);
  const [summary, setSummary] = useState({ total_records: 0, total_deliveries: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [recordsRes, summaryRes] = await Promise.all([
          fetch('http://localhost:8080/records'),
          fetch('http://localhost:8080/summary')
        ]);

        if (!recordsRes.ok || !summaryRes.ok) throw new Error('Falha na API');

        const recordsData = await recordsRes.json();
        const summaryData = await summaryRes.json();

        setRecords(recordsData);
        setSummary(summaryData);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="p-8 text-center text-gray-600 font-bold">Carregando painel gerencial...</div>;
  if (error) return <div className="p-8 text-center text-red-500 font-bold">Erro ao carregar dados da API. O backend está rodando na porta 8080?</div>;
  if (records.length === 0) return <div className="p-8 text-center text-gray-500 font-bold">Nenhum registro encontrado. Adicione dados pelo formulário Angular.</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Painel de Indicadores</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow border-l-4 border-blue-500">
            <h2 className="text-gray-500 text-sm uppercase font-bold">Total de Registros</h2>
            <p className="text-4xl font-bold text-gray-800">{summary.total_records}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow border-l-4 border-green-500">
            <h2 className="text-gray-500 text-sm uppercase font-bold">Total de Entregas</h2>
            <p className="text-4xl font-bold text-gray-800">{summary.total_deliveries}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Entregas por Período</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={records}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="reference_date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="deliveries" fill="#3b82f6" name="Entregas" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full text-left">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-gray-500 font-bold uppercase text-xs">Funcionário</th>
                <th className="px-6 py-3 text-gray-500 font-bold uppercase text-xs">Departamento</th>
                <th className="px-6 py-3 text-gray-500 font-bold uppercase text-xs">Data de Ref.</th>
                <th className="px-6 py-3 text-gray-500 font-bold uppercase text-xs">Entregas</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {records.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{record.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{record.department}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{record.reference_date}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 font-bold">{record.deliveries}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;