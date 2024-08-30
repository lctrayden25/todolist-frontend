import { Button, Flex, Form, Input } from "antd";
import React, { useCallback, useState } from "react";
import { API_URL } from "../helpers/constant";

type TodoType = {
	todo: string;
};

const TodoList = () => {
	const [data, setData] = useState<undefined>();
	const [form] = Form.useForm();

	const onFinish = useCallback(async (values: TodoType) => {
		console.log(values);
	}, []);

	return (
		<Form
			// name="todoForm"
			onFinish={onFinish}
			initialValues={{ todo: "" }}
			autoComplete="off"
			style={{ width: "100%" }}
		>
			<Flex gap={32}>
				<Form.Item<TodoType> name="todo" style={{ width: "100%" }}>
					<Input
						type="text"
						placeholder="What are your targets to be done today ?"
						size="large"
					/>
				</Form.Item>
				<Form.Item>
					<Button type="primary" htmlType="submit" size="large">
						Add Todo
					</Button>
				</Form.Item>
			</Flex>
		</Form>
	);
};

export default TodoList;
