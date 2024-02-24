import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import AWS from "aws-sdk";
import MDButton from "components/MDButton";
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from "axios";
import { TextField, Card, CardContent } from '@mui/material';
import MDTypography from "components/MDTypography";
import Cookies from 'js-cookie'
import { useNavigate } from "react-router-dom";
const S3 = () => {
    const axiosInstance = axios.create({
        baseURL: "http://localhost:8089/A_Eye",
        withCredentials: true,
      });
      
    const navigate = useNavigate();
    const loginVO = JSON.parse(sessionStorage.getItem('UserInfo'));

    const [uploadedFile, setUploadedFile] = useState(null);
    const [showUploadAlert, setShowUploadAlert] = useState(false);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleStartDateChange = (e) => {
        setStartDate(e.target.value);
    };

    const handleEndDateChange = (e) => {
        setEndDate(e.target.value);
    };

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    const handleChange2 = (event) => {
        setGender(event.target.value);
    };

    const onDrop = (acceptedFiles) => {
        const file = acceptedFiles[0];
        setUploadedFile(file);
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    const handleButtonClick = async () => {
        await getUserInfo();
        if (uploadedFile && startDate && endDate) {
            const id_key = process.env.REACT_APP_AWS_ACCESS_KEY_ID;
            const secret_key = process.env.REACT_APP_AWS_SECRET_ACCESS_KEY;
            const region = process.env.REACT_APP_AWS_REGION;
            const ageAndGender = `${age}/${gender}`;
            const key = `${ageAndGender}/${uploadedFile.name}`;
            AWS.config.update({
                accessKeyId: id_key,
                secretAccessKey: secret_key,
                region: region
            });

            const s3 = new AWS.S3();
            const params = {
                Bucket: "video-add",
                Key: key,
                Body: uploadedFile
            };

            try {
                const axiosInstance = axios.create({
                    baseURL: "http://43.201.117.185:8089/A_Eye",
                    withCredentials: true,
                });
                const response = await s3.upload(params).promise();
                console.log("File uploaded successfully:", response.Location);
                const adData = {
                    ad_name: uploadedFile.name,
                    user_idx: loginVO.user_idx,
                    ad_target_age: age,
                    ad_target_gender: gender,
                    ad_start_date: startDate,
                    ad_end_date: endDate
                };
                console.log(adData)
                const responseServer = await axiosInstance.post("/api/application", adData);
                console.log("Server response:", responseServer.data);
                setShowSuccessAlert(true);
                setUploadedFile(null);
            } catch (error) {
                console.error("Error uploading file:", error);
            }
        } else {
            setShowUploadAlert(true)
        }
    };

    const getUserInfo = async () => {
        try {
          let token;
    
          const adminCookie = Cookies.get("Admin");
          const userCookie = Cookies.get("User");
    
          if (adminCookie) {
            token = adminCookie
          } else if (userCookie) {
            token = userCookie
          } else {
            // 쿠키가 없을 때 --> 로그인이 아예 안된 경우
            alert("로그인을 해 주세요.")
            navigate("/authentication/sign-in");
          }
    
           const config = {
            headers: {
              Authorization: `Bearer${token}`
            }
          };
     
           await axiosInstance.get("/api/prove", config);
    
        } catch (error) {
          //  토큰의 서명이 올바르지 않거나 토큰의 내용이 손상되었을 경우
          if (error.response.data == "토큰 검증에 실패했습니다.") {
            alert("다시 로그인 해주세요.")
            navigate("/authentication/sign-in");
            // 쿠키는 있지만 jwt가 만료되었을 때
          } else if (error.response.data == "토큰이 만료되었습니다.") {
            
            
            var jwtFromCookie = Cookies.get("reToken");
            if (jwtFromCookie) {
              const reTkken = {
                headers: {
                  Authorization: `Bearer${jwtFromCookie}`
                }
              };
    
              try {
                // refresh 토큰을 이용해 access 토큰을 재발급
                const loginVO = JSON.parse(sessionStorage.getItem('UserInfo'));
    
                const queryParams = new URLSearchParams({
                  user_name: loginVO.user_name,
                  user_position: loginVO.user_position,
                  user_idx: loginVO.user_idx
                  //user_idx:loginVO.user_idx
                }).toString();
    
                const url = `/api/reProve?${queryParams}`;
    
                const response = await axiosInstance.get(url, reTkken);
    
                // const response = await axiosInstance.get("/api/reProve", reTkken, data);
                const newToken = response.data
                const adminCookie = Cookies.get("Admin");
                const userCookie = Cookies.get("User");
                if (adminCookie) {
                  Cookies.set("Admin", newToken)
                } else if (userCookie) {
                  Cookies.set("User", newToken)
                }
    
              } catch (error) {
                // refresh 토큰이 유효하지 않거나 발급 실패 등의 처리
                if (error.response.data == "다시 로그인 해주세요") {
                  alert("다시 로그인 해주세요.")
                  navigate("/authentication/sign-in");
                }
              }
            }
    
          }
        }
      }

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Card style={{
                marginBottom: 20,
                position: "relative",
                width: '85%',
                height: '50vh',
                borderRadius: 20,
                border: "5px solid #000",
            }}>
                <MDTypography variant="button" color="dark" fontWeight="regular" style={{ marginTop: 30 }}>
                        광고 기간을 선택해주세요.
                    </MDTypography>
                <CardContent >
                    <TextField
                        id="start-date"
                        type="date"
                        value={startDate}
                        onChange={handleStartDateChange}
                        InputLabelProps={{
                            shrink: true,
                            style: { fontSize: 20 },
                        }}
                        style={{ margin: 10, width: '10%' }}
                    />
                    <MDTypography variant="button" fontWeight="regular" style={{ margin: 8 }}>
                        ~
                    </MDTypography>
                    <TextField
                        id="end-date"
                        type="date"
                        value={endDate}
                        onChange={handleEndDateChange}
                        InputLabelProps={{
                            shrink: true,
                            style: { fontSize: 20 },
                        }}
                        style={{ margin: 10, width: '10%' }}
                    />
                    <div>
                    
                    </div>
                    <FormControl sx={{ minWidth: 10, m: 1, height: '60px', margin: 5 }}>
                        <InputLabel id="demo-simple-select-helper-label" sx={{ fontSize: '17px', height: '60px' }} >Age</InputLabel>
                        <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            value={age}
                            label="Age"
                            onChange={handleChange}
                            sx={{ height: '45px' }}
                        >
                            <MenuItem value={10}>10대</MenuItem>
                            <MenuItem value={20}>20대</MenuItem>
                            <MenuItem value={30}>30대</MenuItem>
                            <MenuItem value={40}>40대</MenuItem>
                            <MenuItem value={50}>50대</MenuItem>
                        </Select>
                        <FormHelperText>광고하고싶은 연령대를 선택해주세요.</FormHelperText>
                    </FormControl>
                    <FormControl sx={{ minWidth: 150, m: 1, height: '60px', margin: 5 }}>
                        <InputLabel id="demo-simple-select-helper-label2" sx={{ fontSize: '17px', height: '60px' }}>Gender</InputLabel>
                        <Select
                            labelId="demo-simple-select-helper-label2"
                            id="demo-simple-select-helper2"
                            value={gender}
                            label="gender"
                            onChange={handleChange2}
                            sx={{ height: '45px' }}
                        >
                            <MenuItem value={"남"}>남자</MenuItem>
                            <MenuItem value={"여"}>여자</MenuItem>
                        </Select>
                        <FormHelperText >광고하고싶은 성별 선택해주세요.</FormHelperText>
                    </FormControl>
                    <div {...getRootProps()} style={{ ...dropzoneStyles, padding: '20px', border: '1px dashed #000' }}>
                        <input {...getInputProps()} />
                        <p>파일을 여기로 끌어다 놓거나 클릭하여 파일을 선택해주세요.</p>
                    </div>
                    <br></br>
                    <MDButton color="info" variant="contained" onClick={handleButtonClick}>
                        광고신청하기
                    </MDButton>
                    {showUploadAlert && (
                        <Alert onClose={() => setShowUploadAlert(false)} severity="warning">
                            파일을 업로드해주세요.
                        </Alert>
                    )}
                    {showSuccessAlert && (
                        <Alert onClose={() => setShowSuccessAlert(false)} icon={<CheckIcon fontSize="inherit" />} severity="success">
                            광고신청 완료
                        </Alert>
                    )}
                </CardContent>
                {uploadedFile && (
                        <div style={{
                            marginTop: 40, borderRadius: 20,
                            border: "3px solid #000"
                        }}>
                            <p>파일 이름: {uploadedFile.name}</p>
                            <p>파일 사이즈: {uploadedFile.size} bytes</p>
                        </div>
                    )}
            </Card>
            
        </div>

    );
};

const dropzoneStyles = {
    border: "5px dashed #3498db",
    borderRadius: "8px",
    padding: "30px",
    textAlign: "center",
    cursor: "pointer",
    backgroundColor: "#f0f0f0",
    color: "#3498db",
    fontSize: "16px",
    fontWeight: "bold",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    height: '10vh',
    zIndex: 1,
};


export default S3;