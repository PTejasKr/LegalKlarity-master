import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface RiskData {
  category: string;
  score: number;
  description: string;
}

interface ComplianceData {
  area: string;
  compliance: number; // 0 to 100
}

const mockRiskData: RiskData[] = [
  { category: 'Financial', score: 8, description: 'High interest rates and unclear fee structure' },
  { category: 'Legal', score: 6, description: 'Ambiguous termination clauses' },
  { category: 'Operational', score: 4, description: 'Limited service level agreements' },
  { category: 'Reputational', score: 7, description: 'Data privacy concerns' },
];

const mockComplianceData: ComplianceData[] = [
  { area: 'Consumer Protection', compliance: 85 },
  { area: 'Data Privacy', compliance: 70 },
  { area: 'Contract Law', compliance: 90 },
  { area: 'Industry Regulations', compliance: 75 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function RiskAssessment() {
  const onPieEnter = (_: any, __: number) => {
    // Handle pie chart hover if needed
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 w-full dark:bg-slate-800 dark:shadow-slate-800/50">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 dark:text-white">Risk Assessment & Compliance</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Risk Scores Bar Chart */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4 dark:text-white">Risk Scores by Category</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={mockRiskData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis domain={[0, 10]} />
                <Tooltip />
                <Legend />
                <Bar dataKey="score" name="Risk Score" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4">
            <h4 className="font-medium text-gray-800 mb-2 dark:text-white">Risk Descriptions</h4>
            <ul className="space-y-2">
              {mockRiskData.map((risk, index) => (
                <li key={index} className="text-sm text-gray-600 dark:text-slate-300">
                  <span className="font-medium">{risk.category}:</span> {risk.description}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Compliance Scores Pie Chart */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4 dark:text-white">Compliance Scores</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  activeShape={renderActiveShape}
                  data={mockComplianceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="compliance"
                  nameKey="area"
                  onMouseEnter={onPieEnter}
                >
                  {mockComplianceData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, 'Compliance']} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4">
            <h4 className="font-medium text-gray-800 mb-2 dark:text-white">Compliance Insights</h4>
            <ul className="space-y-2">
              <li className="text-sm text-gray-600 dark:text-slate-300">
                <span className="font-medium">Overall Compliance Score:</span> 80%
              </li>
              <li className="text-sm text-gray-600 dark:text-slate-300">
                <span className="font-medium">Recommendation:</span> Focus on improving Data Privacy compliance
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Risk Mitigation Suggestions */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 dark:text-white">Risk Mitigation Suggestions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg dark:bg-blue-900/30">
            <h4 className="font-medium text-blue-800 mb-2 dark:text-blue-300">Financial Risk</h4>
            <p className="text-sm text-blue-700 dark:text-blue-200">
              Clarify all fee structures and payment conditions. Consider adding a cap on variable interest rates.
            </p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg dark:bg-yellow-900/30">
            <h4 className="font-medium text-yellow-800 mb-2 dark:text-yellow-300">Legal Risk</h4>
            <p className="text-sm text-yellow-700 dark:text-yellow-200">
              Define clear termination conditions and notice periods. Add dispute resolution clauses.
            </p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg dark:bg-green-900/30">
            <h4 className="font-medium text-green-800 mb-2 dark:text-green-300">Operational Risk</h4>
            <p className="text-sm text-green-700 dark:text-green-200">
              Establish detailed service level agreements (SLAs) with specific performance metrics.
            </p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg dark:bg-purple-900/30">
            <h4 className="font-medium text-purple-800 mb-2 dark:text-purple-300">Reputational Risk</h4>
            <p className="text-sm text-purple-700 dark:text-purple-200">
              Implement stronger data protection measures and obtain explicit consent for data usage.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Custom active shape for PieChart
const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.area}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`Compliance: ${value}%`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(Rate: ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

// Define Sector type for the custom shape
const Sector = (props: any) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
  const x1 = cx + innerRadius * Math.cos(startAngle * Math.PI / 180);
  const y1 = cy + innerRadius * Math.sin(startAngle * Math.PI / 180);
  const x2 = cx + outerRadius * Math.cos(startAngle * Math.PI / 180);
  const y2 = cy + outerRadius * Math.sin(startAngle * Math.PI / 180);
  const x3 = cx + outerRadius * Math.cos(endAngle * Math.PI / 180);
  const y3 = cy + outerRadius * Math.sin(endAngle * Math.PI / 180);
  const x4 = cx + innerRadius * Math.cos(endAngle * Math.PI / 180);
  const y4 = cy + innerRadius * Math.sin(endAngle * Math.PI / 180);

  const pathData = `
    M ${x1} ${y1}
    L ${x2} ${y2}
    A ${outerRadius} ${outerRadius} 0 0 1 ${x3} ${y3}
    L ${x4} ${y4}
    A ${innerRadius} ${innerRadius} 0 0 0 ${x1} ${y1}
    Z
  `;

  return <path d={pathData} fill={fill} />;
};