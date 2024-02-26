import { useEffect, useState } from 'react';
import axios from 'axios';

const Payment = ({ onCloseModal, totalAmount, result }) => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const axiosInstance = axios.create({
    baseURL: 'http://43.201.117.185:8089/A_Eye',
    withCredentials: true,
  });
  /*  const modifiedAdList = boardList.map(row => ({
              id: row.ad_idx,
              광고: row.ad_name,
              금액: row.ad_play_number * 500,
              '재생 횟수': row.ad_play_number,
              '시작 날짜': row.ad_start_date,
              '종료 날짜': row.ad_end_date,
              '결제 상태': 500
            })); */
  useEffect(() => {
    const loadScripts = async () => {
      try {
        const loadScript = (src) => {
          return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
          });
        };
        await loadScript('https://code.jquery.com/jquery-1.12.4.min.js');
        await loadScript('https://cdn.iamport.kr/js/iamport.payment-1.1.7.js');

        const { IMP } = window;
        if (IMP) {
          IMP.init('imp13664086');

          const data = {
            pg: 'nice',
            pay_method: 'card',
            merchant_uid: `mid_${new Date().getTime()}`,
            name: '결제 테스트',
            amount: totalAmount,
            custom_data: {
              name: '부가정보',
              desc: '세부 부가정보'
            },
            buyer_name: 'q',
            buyer_tel: '01012345678',
            buyer_email: '14279625@gmail.com',
            buyer_addr: '구천면로 000-00',
            buyer_postalcode: '01234',
          };


          IMP.request_pay(data, callback);
        } else {
          console.error('IMP (Import) is not available.');
        }
      } catch (error) {
        console.error('Error loading scripts:', error);
      }
    };

    const callback = async (response) => {
      const { success, error_msg, cancel_request } = response;
      if (success) {
        try {
          // result 배열을 순회하여 각 객체의 id와 계산된 금액을 이용하여 요청을 보내기
          for (const item of result) {
            const id = item.id;
            const pay_cost = item.금액; // 금액 값을 사용하여 결제 비용 설정
        
            await axiosInstance.post('/api/payResult', {
              ad_idx: id, // id를 ad_idx로 설정
              pay_cost,
              pay_method: 'card' // pay_method 변수에 'card' 값 할당
            });
          }
          alert('결제 완료.')
        } catch (error) {
          console.error('Error during data fetching:', error);
        }
      } else if (cancel_request) {
        alert('결제가 취소되었습니다.');
      } else {
        alert(`결제 실패: ${error_msg}`);
      }

      setIsModalOpen(false); // if-else 블록 바깥으로 이동
    };

    loadScripts();

    return () => {
      // Clean up if needed
    };
  }, []);

  useEffect(() => {
    if (!isModalOpen) {
      onCloseModal();
      const modalContainer = document.querySelector('.MuiDialog-container');
      if (modalContainer) {
        modalContainer.style.display = 'none';
      }
    }
  }, [isModalOpen, onCloseModal]);


  return null;
};

export default Payment;