import React from 'react'
import { Link } from 'react-router-dom'
import './CoursesPage.css'
import { Navbar } from '../../components/Navbar/Navbar'
import Carousel from '../../components/CarouselImages/Carousel'
import { CarouselCourses } from '../../components/CarouselCourses/CarouselCourses'



export const CoursesPage = () => {
  return (
    <>
<Navbar/>
      <body>
        <Carousel />
        <h1 className='title'>Cursos</h1>
        <CarouselCourses/>
      </body>
    </>
  )
}
