import { ArrowDownIcon, ArrowUpIcon, RocketIcon, Sparkles } from 'lucide-react'
import { MetricsCard } from '../../components/MetricsCard'
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import styles from './styles.module.css'

export function Metrics() {
  const sales = [
    { date: '01/03', sales: 4000 },
    { date: '10/03', sales: 5000 },
    { date: '20/03', sales: 2500 },
    { date: '30/03', sales: 3500 }
  ]

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        <MetricsCard
          title='Product B'
          icon={<RocketIcon color='#fb923c'/>}
          value={8000}
          difference={4}
        />
        <MetricsCard
          title='IT'
          icon={<ArrowUpIcon color='#2dd4bf'/>}
          value={50000}
          difference={20}
        />
        <MetricsCard
          title='Category with least sales'
          icon={<ArrowDownIcon color='#f87171'/>}
          value={2350}
          difference={-10}
        />
        <MetricsCard
          title='Total profit'
          icon={<Sparkles color='#c084fc'/>}
          value={561200}
          difference={13}
        />
      </div>

      <div className={styles.chartGrid}>
        <div>
          <h1>Product sales</h1>
          <p>Product sales throughout the month</p>
          <ResponsiveContainer
            width='100%'
            height={280}
          >
            <AreaChart data={sales}>
              <CartesianGrid stroke='#18181b'/>
              <XAxis dataKey='date' stroke='#f4f4f5'/>
              <YAxis stroke='#f4f4f5'/>
              <Area
                dataKey='sales'
                stroke='#fdba74'
                fill='transparent'
                type='monotone'
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: 'none'
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
