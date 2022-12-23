import React, { useState, Suspense } from 'react';
import Layout from './layout';
import { useParams } from 'react-router-dom';
import DetailModal from '../components/modal/detail-modal.component';
import Wayang from '../components/wayang/wayang.component';
import CardLoading from '../components/card-loading/card-loading.component';

const Detail = () => {
	const [visibleModal, setVisibleModal] = useState(false);
	const [loading, setLoading] = useState(true);
	const [modalData, setModalData] = useState({
		type: '',
		videoLink: '',
		desc: '',
	});
	const { id } = useParams();

	const CloseDetailModal = () => {
		setVisibleModal((prev) => !prev);
	};

	const DummyDataDetail = {
		id: 1,
		name: 'Kresna',
		object: 'https://prod.spline.design/wGCnakpu5DICWg9C/scene.splinecode',
		category: 'Mahabarata',
		origin: 'Mathura',
		desc: 'Dalam budaya pewayangan Jawa, tokoh Kresna dikenal sebagai raja Dwarawati (Dwaraka), kerajaan para keturunan Yadu dan merupakan titisan Dewa Wisnu. Kresna muda bernama Narayana, adalah putra Basudewa, Raja Mandura (Mathura).',
		descLink: '#',
		addition: [
			{
				type: 'senjata',
				icon: 'https://i.ibb.co/8rDHtYc/sword.png',
				name: ' Cakra Sudarsana',
				desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque odio placeat non fugit est quibusdam cumque excepturi, eligendi nesciunt esse ratione corrupti quisquam, id blanditiis ad nemo animi sapiente provident.',
			},
			{
				type: 'kisah',
				name: 'Kresna',
				icon: 'https://i.ibb.co/fQC7mvK/story.png',
				desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque odio placeat non fugit est quibusdam cumque excepturi, eligendi nesciunt esse ratione corrupti quisquam, id blanditiis ad nemo animi sapiente provident.',
			},
			{
				type: 'video',
				icon: 'https://i.ibb.co/QQGYpd5/video.png',
				name: ' Cakra Sudarsana',
				videoUrl: 'https://www.youtube.com/embed/9um16c8M5dQ',
			},
		],
	};

	const { name, desc, descLink, addition, object } = DummyDataDetail;

	return (
		<Layout padding='pt-8'>
			<div className='w-[1240px]'>
				<div className='text-start text-base tracking-[0.22em] text-primary'>
					<a href='/'>Home</a> / <span>Wayang</span> / <span>{name}</span>
				</div>
				<div className='flex gap-28 w-full mx-auto h-[522px] mt-10'>
					<div className='w-5/12 bg-card-background rounded-[50px] shadow-xl'>
						<div className='flex justify-center items-center w-full h-full '>
							<Wayang onLoadHandler={() => setLoading(false)} object={object} />
							{loading && <CardLoading />}
						</div>
					</div>
					<div className='flex flex-col w-6/12 pt-3'>
						<h2 className='font-semibold text-2xl'>{name}</h2>
						<p className='text-lg tracking-[0.06em] font-light w-[533px] mt-6 mb-9'>
							{desc}
						</p>
						<button className='bg-primary font-light text-lg w-fit text-white rounded-[10px] px-[30px] py-3'>
							<a href={descLink}>Read More</a>
						</button>

						<div className='flex gap-[50px] mt-16'>
							{addition.map((item, index) => {
								return (
									<div
										key={index}
										className='rounded-[18px] bg-card-background flex justify-center items-center cursor-pointer shadow-md w-[108px] h-[103px]'
										onClick={() => {
											setVisibleModal((prev) => !prev);
											setModalData({
												type: item.type,
												videoLink: item.videoUrl,
												desc: item.desc,
											});
										}}>
										<img
											src={item.icon}
											className='w-14 h-14'
											alt={item.type}
										/>
									</div>
								);
							})}
						</div>
					</div>
				</div>
			</div>
			{visibleModal ? (
				<DetailModal onCloseModalHandler={CloseDetailModal} {...modalData} />
			) : null}
		</Layout>
	);
};

export default Detail;
