# A_Eye
<img src = "https://github.com/KIMGUUNI/A_EyeF/assets/142488051/b81fcb02-1485-4ef5-8a0f-ae98df7eb9b2" width="100%" height="100%">

# 1. 서비스 소개 / 서비스 설명
- 엘리베이터에 탑승한 사람의 연령과 성별을 분석하여 맞춤 광고를 재공할 수 있는 광고 신청 서비스

# 2. 사용한 언어
| 구분         | 내용               |
|--------------|-------------------|
| 사용 언어    | <img src="https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white" /> <img src="https://img.shields.io/badge/Python-14354C?style=for-the-badge&logo=python&logoColor=white" /> <img src="https://img.shields.io/badge/HTML-239120?style=for-the-badge&logo=html5&logoColor=white" /> <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white" /> <img src="https://img.shields.io/badge/CSS-239120?style=for-the-badge&logo=css3&logoColor=white" /> |
| DB  | <img src="https://img.shields.io/badge/Oracle-F80000?style=for-the-badge&logo=oracle&logoColor=black" />|
| Collaboration |<img src="https://i.namu.wiki/i/PJXhYEqwxDj8ck8vHS4zfbrur-ZxVdWSeKTuvAJnoDtLwky1YuZxN0DVu5DYCUwWfITmQGf0gB6km50-Yva3Cg.webp" width="90"> <img src="https://bookface-images.s3.amazonaws.com/logos/1f147b7526b12554a4ea7cd2312a694892459acc.png?1630010761" width="90"> |
| BACK-END  | <img src="https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white" />  <img src="https://blog.kakaocdn.net/dn/bpMn1w/btqEbuwPNvX/VNyzW4QFj1NGoCuQB3EwG0/img.jpg" height="30">|
| storage   | <img src="https://techrecipe.co.kr/wp-content/uploads/2020/08/200824_Google-Drive_001.jpg" width="100">  |
| 라이브러리| <img src="https://img.shields.io/badge/TensorFlow-FF6F00?style=for-the-badge&logo=tensorflow&logoColor=white" />  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTc1aov4a4ONcOBVIXydQjhh5intGt6j8yz5D9vdHe4p-gJAth-jzTUsaMS9cyMpQy66Q&usqp=CAU" width="80">  |
| WebServer    | <img src="https://images.velog.io/images/dbfudgudals/post/2ec0586e-1d62-475d-85c4-0f78b9d2fc34/image.png" width="100">    |
| IDE   | <img src="https://img.shields.io/badge/Eclipse-2C2255?style=for-the-badge&logo=eclipse&logoColor=white" /> |

# 3. ERD 
<img src = "https://github.com/KIMGUUNI/A_EyeF/assets/142488051/d002a731-40eb-4bec-9337-c2773b836a6a" width="100%" height="100%">

# 4. 시스템 아키텍처 
<img src = "https://github.com/KIMGUUNI/A_EyeF/assets/142488051/5d37f1ac-ca6b-4e50-a107-f4adda580753" width="100%" height="100%">

# 5. 핵심 기능
<details>  
     <summary><b><h2>> 핵심 기능 설명 펼치기</h2></b></summary>

# 5.1 전체 흐름도 
<img src = "https://github.com/KIMGUUNI/A_EyeF/assets/142488051/d1b6abde-bf4d-4c6b-9da8-e5df2b5556a3" width="100%" height="100%">

# 5.2 JWT 시큐리티 

# 5.4 객체 인식
<p align="center">
  <img src="https://github.com/KIMGUUNI/A_EyeF/assets/142488051/74f2c094-3ea8-49af-bf2f-28cf2c273eeb" alt="Image 1" width="48%">
  <img src="https://github.com/KIMGUUNI/A_EyeF/assets/142488051/13c77b8f-ee99-4da0-982d-9a5c90a4666f" alt="Image 2" width="48%">
</p>
    <h4>얼굴을 인식해서 나이대와 성별 파악 후 SQS Message Body 생성</h4>
    <h4>MediaPipe Face Mesh를 이용하여 특정 행동 시 노출 횟수 카운트로 인사이트 제공</h4>

# 5.3 광고 송출 페이지
<p>
<img src = "https://github.com/KIMGUUNI/A_EyeF/assets/142488051/58f79ab5-3dc1-4092-a5bf-d62c94146dd4" alt="Image 1" width="100%">
<img src = "https://github.com/KIMGUUNI/A_EyeF/assets/142488051/ccbb0622-c529-4979-a22d-85a1402e7a3d" alt="Image 2" width="48%">
<img src = "https://github.com/KIMGUUNI/A_EyeF/assets/142488051/fc123eb1-811d-4099-a77f-8f057f7a84a2" alt="Image 3" width="48%">
</p>
     <h4>Message로 Lambda 함수 트리거 / S3 객체 URL 반환 후 API Gateway WebSocket으로 실시간 영상 송출</h4>

# 5.7 광고 신청
<img src = "https://github.com/KIMGUUNI/A_EyeF/assets/142488051/9004c8f1-76af-451e-a753-3acea0ef4886" width="100%" height="100%">
    <h4>파일을 업로드하면 데이터베이스 및 S3 저장</h4>
    
# 5.5 광고 승인
<img src = "https://github.com/KIMGUUNI/A_EyeF/assets/142488051/2fbc8f3f-4efc-48aa-bec2-81e83b037673" width="48%" alt="Image 1">
<img src = "https://github.com/KIMGUUNI/A_EyeF/assets/142488051/0d92a225-f611-4c46-921b-1021159cb295" width="48%" alt="Image 2">
    <h4>승인되지 않은 광고를 웹페이지에서 확인가능</h4>
    <h4>승인 시 기존 S3 URL 파일을 복사하여 새로운 폴더에 저장 후 기존 파일 삭제</h4>

# 5.6 대시보드
<img src = "https://github.com/KIMGUUNI/A_EyeF/assets/142488051/76671829-c7c4-4f6e-9e26-1563fb8725ab" width="100%" height="100%">
    <h4>사용자가 특정한 광고 데이터를 선택하여 열람 가능</h4>
    <h4>사용자가 본인의 광고 현황 확인 가능</h4>
    <h4>실적 지역별 실시간 노출 횟수 열람 가능</h4>

# 5.8 광고 결제
<img src = "https://github.com/KIMGUUNI/A_EyeF/assets/142488051/4865b864-f61c-4ae3-a5b9-552b2d9e4631" width="100%" height="100%">
    <h4>신청한 광고의 현재 재생 횟수와 결제할 금액 확인 및 결제 가능</h4>
    <h4>간편 결제 기능 구현(카카오페이,삼성페이 등)</h4>
    
# 5.9 문의글 답변 및 삭제
<img src = "https://github.com/KIMGUUNI/A_EyeF/assets/142488051/92321e9e-5a16-43bc-a01d-191395f5a723" width="100%" height="100%">
    <h4>사용자는 문의할 내용이 있으면 게시글 작성 가능</h4>
    <h4>관리자는 문의 내용 열람 가능 및 답변과 삭제 가능</h4>

</details>

# 6. 개발 기간 및 작업관리

## 개발 기간
- 전체 개발 기간 : 2024-02-01 ~ 2024-02-27

## 작업관리
- GitHub를 사용하여 프로젝트 협업을 진행하였습니다.
- 매일 프로젝트를 진행하기 전 작업 순서와 방향성에 대해 회의를 하고 새롭게 배운 내용을 공유하는 시간을 가졌습니다.

# 7. 팀원소개

# 8. 트러블 슈팅

# 9. API 
날씨 https://openweathermap.org/

뉴스 https://newsapi.org/

결제 https://portone.io/
