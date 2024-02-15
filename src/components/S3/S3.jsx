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
import { TextField,Card, CardContent } from '@mui/material';
import MDTypography from "components/MDTypography";
const S3 = () => {
    const loginVO = JSON.parse(sessionStorage.getItem('loginVO'));
   
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
                    baseURL: "http://localhost:8089/A_Eye",
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

    return (
        <Card style={{ marginBottom: 20 }}>
            <CardContent>
                <TextField
                    id="start-date"
                    type="date"
                    value={startDate}
                    onChange={handleStartDateChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    
                />
                <MDTypography variant="button" color="text" fontWeight="regular">
                              ~
                </MDTypography>
                <TextField
                    id="end-date"
                    type="date"
                    value={endDate}
                    onChange={handleEndDateChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    
                />
                <div></div>
                <FormControl sx={{ minWidth: 150, m: 1, height: '60px' }}>
                    <InputLabel id="demo-simple-select-helper-label" sx={{ fontSize: '17px', height: '60px' }}>Age</InputLabel>
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
                    <FormHelperText>광고하고싶은 연령대를 선택하세요</FormHelperText>
                </FormControl>
                <FormControl sx={{ minWidth: 150, m: 1, height: '60px' }}>
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
                    <FormHelperText>광고하고싶은 성별 선택하세요</FormHelperText>
                </FormControl>
                <div {...getRootProps()} style={dropzoneStyles}>
                    <input {...getInputProps()} />
                    <p>Drag & drop a file here, or click to select a file</p>
                </div>
                <br></br>
                <MDButton color="info" onClick={handleButtonClick}>
                    Upload
                </MDButton>
                {showUploadAlert && (
                    <Alert onClose={() => setShowUploadAlert(false)} severity="warning">
                        파일을 업로드해주세요
                    </Alert>
                )}
                {showSuccessAlert && (
                    <Alert onClose={() => setShowSuccessAlert(false)} icon={<CheckIcon fontSize="inherit" />} severity="success">
                        광고신청 완료
                    </Alert>
                )}
                {uploadedFile && (
                    <div>
                        <p>Uploaded File:</p>
                        <p>Name: {uploadedFile.name}</p>
                        <p>Size: {uploadedFile.size} bytes</p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

const dropzoneStyles = {
    border: "2px dashed #cccccc",
    borderRadius: "10px",
    marginTop: '3%',
    padding: "20px",
    textAlign: "center",
    cursor: "pointer"
};

export default S3;