import { useEffect, useState } from 'react';

import { postService } from '../../service/index';

import { BlurCardContainer, BlurCardContainerSkeleton } from '../index';
import { useToast } from '@/components/ui/use-toast'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Parallax, Autoplay, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';


function MainSlider() {
    const {toast} = useToast()
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])

    useEffect(() => {

        (async () => {
            setData([]);
            setLoading(true);
            try {
              
                const response = await postService.getPosts();
                if(response.status == 200){
                    setData(response.results)
                }else{
                    toast({ variant: "destructive", title: "Something went wrong. Please try again later.".toUpperCase(),})
                }

            } catch (error) {
                console.log(error)
              toast({ variant: "destructive", title: 'Something went wrong.',})
            }finally{
              setLoading(false);
            }
      
          })();

    }, []);

  return (
    <>
        <Swiper
            style={{
            'position': 'relative',
            'overflow': 'hidden',
            'top': '-20px',
            'height': '89.5vh',
            '--swiper-navigation-color': '#fff',
            '--swiper-pagination-color': '#fff',
            }}
            speed={600}
            parallax={true}
            loop={true}
            pagination={{
                clickable: true,
            }}
            autoplay={{
                delay: 3500,
                disableOnInteraction: false,
            }}
            navigation={false}
            modules={[Parallax, Pagination, Autoplay]}
            className="mySwiper"
        >
            <div
            slot="container-start"
            className="parallax-bg"
            style={{
                'background-image':
                'url(https://images.unsplash.com/photo-1476842634003-7dcca8f832de?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
            }}
            data-swiper-parallax="-23%"
            ></div>
            {
                loading ?
                <>
                <SwiperSlide className='px-20 py-12'>
                    <div className='w-full h-full flex flex-col items-start justify-center text-white'>
                        <BlurCardContainerSkeleton/>
                    </div>
                </SwiperSlide>
                <SwiperSlide className='px-20 py-12'>
                    <div className='w-full h-full flex flex-col items-start justify-center text-white'>
                        <BlurCardContainerSkeleton/>
                    </div>
                </SwiperSlide>
                <SwiperSlide className='px-20 py-12'>
                    <div className='w-full h-full flex flex-col items-start justify-center text-white'>
                        <BlurCardContainerSkeleton/>
                    </div>
                </SwiperSlide>
                </> :
            <>
            {   
                //TODO: autoplay not working
                data.length > 0 &&
                data.map((post) => (
                    <SwiperSlide key={post.uuid} className='px-20 py-12'>
                        <div className='w-full h-full flex flex-col items-start justify-center text-white'>
                            <BlurCardContainer
                                postUUID={post.uuid}
                                date={post.created_at}
                                likeCount={post.likes_no}
                                commentCount={post.comments_no}
                                author={post.user?.first_name + ' ' + post.user?.last_name}
                                authorUUID={post.user?.uuid}
                                authorImg={post.user?.profile_pic}
                                title={post.title}
                                description={post.truncated_content}                    
                                tag={post.tags_parsed}
                            />
                        </div>
                    </SwiperSlide>
                ))
            }
            </>
            }

        </Swiper>
    
    </>
  )
}

export default MainSlider