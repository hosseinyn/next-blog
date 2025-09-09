import Category from "../components/Category";

const page = () => {
  return (
    <div className="flex flex-col gap-6 mt-10 mb-10 items-center justify-center">

      <h1 className="text-4xl mt-1 mb-3">
        Categories
      </h1>

      <hr className="w-xl" />

      <Category name="Programming" image="/categories/programming.jpg" description="This category is for programming and computer science and people will share their knowledge and experience about programming subjects like games , web development , security , computer math and etc." img_link="https://unsplash.com/photos/black-flat-screen-computer-monitor-mZnx9429i94?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash" />

      <Category name="Life" image="/categories/life.jpg" description="This category is for write ups about life , relations , peace , life styles , feelings , senses and mindset. People will share their experience , knowledge and mindset about life , society and bad/good things about their lifes." img_link="https://unsplash.com/photos/silhouette-of-person-standing-on-rock-surrounded-by-body-of-water-odxB5oIG_iA?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash" />

      <Category name="Science" image="/categories/science.jpg" description="This category is for write ups about science , space , math , chemistry , human science and etc. People that love science will share their knowledge about modern technologies and diffrent kinds of science." img_link="https://unsplash.com/photos/starry-sky-Z6EpCdMcoUU?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash" />

    </div>
  )
}

export default page