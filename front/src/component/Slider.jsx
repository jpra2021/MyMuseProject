import { useEffect, useState } from 'react';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import { sliderData } from 'src/data/slider-data';
import styled from '@emotion/styled';

const SliderLayout = styled.div`
	.slider {
		width: 100%;
		height: 70vh;
		position: relative;
		overflow: hidden;
	}

	.slide {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
		transform: translateX(50%);
		transition: all 0.5s ease;
	}

	.slide img {
		width: 100%;
		height: 100%;
	}

	.content {
		position: absolute;
		top: 23rem;
		left: 5rem;
		opacity: 0;
		width: 60%;
		padding: 3rem;
		background: rgba(0, 0, 0, 0.7);
		animation: slide-up 1s ease 0.5s;
		animation-fill-mode: forwards;
		visibility: hidden;
	}

	@keyframes slide-up {
		0% {
			visibility: visible;
			top: 23rem;
		}
		100% {
			visibility: visible;
			top: 40%;
		}
	}

	.content > * {
		color: #fff;
		margin-bottom: 1rem;
	}

	.current {
		opacity: 1;
		transform: translateX(0);
	}

	.current .content {
		opacity: 1;
	}

	.arrow {
		/* border: 2px solid #fff; */
		border-radius: 50%;
		/* background: transparent; */
		background-color: black;
		color: #fff;
		width: 2rem;
		height: 2rem;
		cursor: pointer;
		position: absolute;
		top: 45%;
		z-index: 999;
	}

	.arrow:hover {
		background: #fff;
		color: black;
	}

	.next {
		right: 1.5rem;
	}
	.prev {
		left: 1.5rem;
	}

	.todetail {
		background-color: black;
		border-radius: 10%;
		color: white;
	}

	hr {
		height: 2px;
		background: #fff;
		width: 50%;
	}
`;

const Slider = () => {
	const [currentSlide, setCurrentSlide] = useState(0);
	const slideLength = sliderData.length;
	// slideLength = 1 2 3 4 5 6 7 8
	// currentSlide = 0 1 2 3 4 5 6 7

	const autoScroll = true;
	let slideInterval;
	let intervalTime = 6000;

	const nextSlide = () => {
		setCurrentSlide(currentSlide === slideLength - 1 ? 0 : currentSlide + 1);
	};

	const prevSlide = () => {
		setCurrentSlide(currentSlide === 0 ? slideLength - 1 : currentSlide - 1);
	};

	function auto() {
		slideInterval = setInterval(nextSlide, intervalTime);
	}

	useEffect(() => {
		setCurrentSlide(0);
	}, []);

	useEffect(() => {
		if (autoScroll) {
			auto();
		}
		return () => clearInterval(slideInterval);
	}, [currentSlide]);

	return (
		<SliderLayout>
			<div className='slider'>
				<AiOutlineArrowLeft className='arrow prev' onClick={prevSlide} />
				<AiOutlineArrowRight className='arrow next' onClick={nextSlide} />

				{sliderData.map((slide, index) => {
					return (
						<div
							className={index === currentSlide ? 'slide current' : 'slide'}
							key={index}
						>
							{index === currentSlide && (
								<>
									<img
										src={slide.image}
										alt='slide'
										style={{ objectFit: 'cover' }}
									/>
									<div className='content'>
										<h2>{slide.heading}</h2>
										<p>{slide.desc}</p>
										<hr />
										<button className='todetail'>상세보기</button>
									</div>
								</>
							)}
						</div>
					);
				})}
			</div>
		</SliderLayout>
	);
};

export default Slider;
