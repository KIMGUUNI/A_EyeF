import React from 'react'
import PropTypes from "prop-types";

// @mui material components

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import PageLayout from "examples/LayoutContainers/PageLayout";
import bgImage2 from "assets/images/bg-reset-cover.jpeg";
import "../CSS/Page1.css"

function Page1() {

    return (
        <PageLayout style={{overflow:"hidden"}} >
            <MDBox
                position="absolute"
                width="100%"
                minHeight="100vh"
                overflow="hidden"
            >
                <MDBox width="100vmax" height="100vmax" mx="auto" overflow="hidden">

                        <MDBox display="flex" mt={1} width="100%" height="100%"  overflow="hidden"
                            sx={{
                                backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
                                    bgImage2 &&
                                    `${linearGradient(
                                        rgba(gradients.dark.main, 0.6),
                                        rgba(gradients.dark.state, 0.6)
                                    )}, url(${bgImage2})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat",
                                

                            }}>
                        

                    <MDBox style={{zIndex : "500", display:"flex", position : "absolute",top: "35%", left:"7%", overflow:"hidden"}}>
                        <h2 class="fly-in-text">
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

// Typechecking props for the BasicLayout
Page1.propTypes = {
    image: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
};

export default Page1