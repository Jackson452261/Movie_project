import Banner from "@/components/Banner"
import requests from "@/Request"
import Row from "@/components/Row"

 const Home = () => {
  return (
    <div>
    <Banner />
    <Row RowId= "1" title='流行的' fetchURL={requests.requestPopular}/> 
    <Row RowId= "2" title='深受歡迎的' fetchURL={requests.requestTopRated}/> 
    <Row RowId= "3"  title='即將上映' fetchURL={requests.requestUpcoming}/> 
    <Row RowId= "4" title='正在上映' fetchURL={requests.now_playing}/> 
    <Row RowId= "5" title='恐怖片' fetchURL={requests.requestHorror}/> 
    </div>
  )
}

export default Home