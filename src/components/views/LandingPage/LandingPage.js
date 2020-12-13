import React, { useEffect, useState } from 'react'
import { API_URL, API_KEY, IMAGE_URL } from '../../Config'
import { Typography, Row } from 'antd'
import MainImage from './Sections/MainImage'
import GridCard from './Sections/GridCard'
import { response } from 'express'
import { connectAdvanced } from 'react-redux'


const { Title } = Typography

function LandingPage() {

    const [Movies, setMovies] = useState()
    const [CurrentPage, setCurrentPage] = useState(0)

    useEffect(() => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=pt-BR&page=1`;
        fetchMovies(endpoint)



    }, [])

    const fetchMovies = (endpoint) => {

        fetch(path)
            .then(response => response.json())
            .then(response => {
                setMovies([...Movies, ...response.results])
                setCurrentPage(response.page)
            })

    }

    const handleClick = () => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=pt-BR&page=${CurrentPage + 1}`
        fetchMovies(endpoint)
    }


    return (
        <div style={{ width: '100%', margin: 0 }}>
            {/* Filme destaque */}
            {Movies[0] &&
                <MainImage image={`${IMAGE_URL}/w1280${Movies[0].backdrop_path}`}
                    title={Movies[0].title}
                    text={Movies[0].overview} />
            }

            <div>



                {/* Body */}
                <div style={{ width: '85%', margin: '1rem auto' }}>
                    <Title level={2}> Últimos filmes</Title>
                    <hr />

                    {/* Cartões Grid */}
                    <Row gutter={[16, 16]}>
                        {Movies && Movies.map((movie, index) => (
                            <React.Fragment key={index}>
                                <GridCard
                                    image={movie.poster_path &&
                                        `${IMAGE_URL}w500${movie.poster_path}`
                                    }
                                    movieId={movie.id}
                                    movieName={movie.original_title}
                                />
                            </React.Fragment>
                        ))}
                    </Row>
                    {/* Botão de carregar mais */}
                    <br />
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <button onClick={handleClick}> Carregar mais...</button>
                    </div>
                </div>
            </div>

        </div>







    )
}

export default LandingPage
