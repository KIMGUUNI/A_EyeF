import { useEffect, useState } from 'react';

const Payment = ({ onCloseModal }) => {
  const [isModalOpen, setIsModalOpen] = useState(true);

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
            amount: '100',
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

    const callback = (response) => {
        const { success, error_msg, cancel_request } = response;
      
        if (success) {
          alert('결제 성공');
        } else if (cancel_request) {
          alert('결제가 취소되었습니다.');
        } else {
          alert(`결제 실패: ${error_msg}`);
        }
      
        setIsModalOpen(false); // Move this line outside the if-else block
      };

    loadScripts();

    return () => {
      // Clean up if needed
    };
  }, []);

useEffect(() => {
  // Close the modal when isModalOpen changes to false
  if (!isModalOpen) {
    onCloseModal();
    // Set the display style to 'none'
    const modalContainer = document.querySelector('.MuiDialog-container');
    if (modalContainer) {
      modalContainer.style.display = 'none';
    }
  }
}, [isModalOpen, onCloseModal]);


  return null;
};

export default Payment;
