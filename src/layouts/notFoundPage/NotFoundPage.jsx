import React from 'react'

// @mui material components

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import PageLayout from "examples/LayoutContainers/PageLayout";
import bgImage1 from "assets/images/a-big-departmentstore-lobby.png";

function NotFoundPage() {
    

    return (
        <PageLayout style={{overflow:"hidden"}} >
            <MDBox
                position="absolute"
                width="100%"
                minHeight="100vh"
                overflow="hidden"
            >
                <MDBox width="100%" height="100%" mx="auto" overflow="hidden">

                        <MDBox display="flex" mt={1} width="100vmax" height="99vh"  overflow="hidden" 
                            sx={{
                                backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
                                bgImage1 &&
                                    `${linearGradient(
                                        rgba(gradients.dark.main, 0.75),
                                        rgba(gradients.dark.state, 0.75)
                                    )}, url(${bgImage1})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat",
                                

                            }}>
                        

                    <MDBox style={{zIndex : "500", width:"100%",height:"100%", display:"flex", position : "fixed", overflow:"hidden", justifyContent:"center", alignItems:"center"}}>
                        <h2 className='text' >
                            페이지를 찾을 수 없습니다!
                        </h2>
                        </MDBox>
                    </MDBox>
                </MDBox>
            </MDBox>
        </PageLayout>
    );
}


export default NotFoundPage