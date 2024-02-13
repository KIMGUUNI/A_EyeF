import React from 'react'
import PropTypes from "prop-types";

// @mui material components

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import PageLayout from "examples/LayoutContainers/PageLayout";
import bgImage3 from "assets/images/elevator2.png";
import "../CSS/Page.css"

function Page2() {

    return (
        <PageLayout style={{overflow:"hidden"}} >
            <MDBox
                position="absolute"
                width="100%"
                minHeight="100%"
                overflow="hidden"
            >
                <MDBox width="100%" height="100%" mx="auto" overflow="hidden">

                        <MDBox display="flex" mt={1} width="100vmax" height="99vh"  overflow="hidden"
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
                        <MDBox style={{zIndex : "500", display:"flex", position : "absolute",top: "35%", left: "7%" ,textAlign : "left", overflow:"hidden"}}>
                            <h2 class="text">
                                광고주가 <br/>
                                필요한 <br/>
                                인사이트 제공
                            </h2>
                        </MDBox>
                        

                        <MDBox style={{zIndex : "500", display:"flex", position : "absolute",top: "35%", right: "7%" ,textAlign : "right", overflow:"hidden"}}>
                            <h2 class="revers-fly-in-text">
                                노출수 <br/>
                                CPC <br/>
                                노출지역
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