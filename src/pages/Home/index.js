
import BarChart from "./components/BarChart"

const Home = () => {
    return (
        <div>
            <BarChart
                title={'三大框架满意度'} 
                xData={['Vue', 'React', 'Angular']}
                sData={[2000, 5000, 1000]} 
             />
             
             <BarChart
                title={'三大框架使用度度'} 
                xData={['Vue', 'React', 'Angular']}
                sData={[2200, 5020, 1010]} 
             />
        </div>
    ) 
}

export default Home