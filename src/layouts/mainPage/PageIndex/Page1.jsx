import React from 'react'

// @mui material components

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import PageLayout from "examples/LayoutContainers/PageLayout";
import bgImage1 from "assets/images/elevator3.png";
import "../CSS/Page.css"

function Page1() {
    

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
                        

                    <MDBox style={{zIndex : "500", display:"flex", position : "absolute",top: "35%", left:"7%", overflow:"hidden"}}>
                        <h2 className="fly-in-text">
                            인공지능 <br/>
                            고객맞춤 <br/>
                            엘레베이터 광고
                        </h2>
                        </MDBox>
                    </MDBox>
                </MDBox>
            </MDBox>
        </PageLayout>
    );
}


export default Page1