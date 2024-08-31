import { Layout, Space, Typography } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import React from "react";

type PageWrapperProps = {
	children: React.ReactNode;
};

const PageWrapper = ({ children }: PageWrapperProps) => {
	return (
		<Layout style={{ minHeight: "100vh" }}>
			<Header
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<Typography.Text style={{ color: "#fff", fontSize: "20px" }}>
					Todo List
				</Typography.Text>
			</Header>
			<Content
				style={{
					maxWidth: "860px",
					width: "100%",
					margin: "auto",
					padding: "3rem",
				}}
			>
				<Space.Compact
					style={{ width: "100%", display: "flex" }}
					direction="horizontal"
					block
				>
					{children}
				</Space.Compact>
			</Content>
		</Layout>
	);
};

export default PageWrapper;
