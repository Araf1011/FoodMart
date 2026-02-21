import React from "react"
import MainBanner from "../components/MainBanner"
import CategoryList from "../components/CategoryList"
import FeaturedProducts from "../components/FeaturedProducts"
import SpecialOffers from "../components/SpecialOffers"

const Home = () => {
    return (
        <div className="flex flex-col gap-10 py-8">
            <MainBanner />
            <CategoryList />
            <SpecialOffers />
            <FeaturedProducts />
        </div>
    )
}
export default Home