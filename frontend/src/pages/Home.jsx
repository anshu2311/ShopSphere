import Hero from "../components/Layout/Hero"
import GenderCollectionSelection from "../components/Products/GenderCollectionSelection"
import NewArrivals from "../components/Products/NewArrivals"

const Home = () => {
  return (
    <div>
     <Hero />
     <GenderCollectionSelection />
     <NewArrivals />
    </div>
  )
}

export default Home