import React from 'react'
import PropTypes from "prop-types";

// @mui material components

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import PageLayout from "examples/LayoutContainers/PageLayout";
import bgImage3 from "assets/images/bg-sign-up-cover.jpeg";
import "../CSS/Page1.css"

function Page2() {

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
                                bgImage3 &&
                                    `${linearGradient(
                                        rgba(gradients.dark.main, 0.6),
                                        rgba(gradients.dark.state, 0.6)
                                    )}, url(${bgImage3})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat",
                                

                            }}>
                        

                    <MDBox style={{zIndex : "500", display:"flex", position : "absolute",top: "35%", left:"7%", overflow:"hidden"}}>
                        <h2 class="fly-in-text">
                            연령 <br/>
                            성별 <br/>
                            맞춤 광고 제공
                        </h2>
                        </MDBox>
                    </MDBox>
                </MDBox>
            </MDBox>
        </PageLayout>
    );
}

// Typechecking props for the BasicLayout
Page2.propTypes = {
    image: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
};

export default Page2