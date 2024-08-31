import {
	Button,
	Card,
	Flex,
	Form,
	Input,
	List,
	Typography,
	Divider,
} from "antd";
import { useMemo } from "react";
import {
	CheckCircleOutlined,
	DeleteOutlined,
	ExclamationCircleOutlined,
} from "@ant-design/icons";
import { useTodoAction } from "../helpers/useTodoAction";

type TodoType = {
	todo: string;
};

export type TodoData = {
	id: string | number;
	name: string;
	status: string;
};

const TodoList = () => {
	const { createTodo, updateTodo, deleteTodo, todoItems, isLoading } =
		useTodoAction();

	const incompletedTodo = useMemo(() => {
		return todoItems?.filter((todo) => todo.status !== "complete");
	}, [todoItems]);

	const completedTodo = useMemo(() => {
		return todoItems?.filter((todo) => todo.status === "complete");
	}, [todoItems]);

	return (
		<Form
			// name="todoForm"
			onFinish={createTodo}
			initialValues={{ todo: "" }}
			autoComplete="off"
			style={{ width: "100%" }}
		>
			<Flex gap={32}>
				<Form.Item<TodoType> name="todo" style={{ width: "100%" }}>
					<Input
						type="text"
						placeholder={`What's your todo list today ?`}
						size="large"
					/>
				</Form.Item>
				<Form.Item>
					<Button type="primary" htmlType="submit" size="large">
						Add Todo
					</Button>
				</Form.Item>
			</Flex>
			<Card title="Todo" loading={isLoading}>
				<List
					itemLayout="vertical"
					dataSource={incompletedTodo}
					renderItem={(item) => (
						<List.Item
							style={{
								width: "100%",
								display: "flex",
								justifyContent: "space-between",
							}}
						>
							<Flex align="center" gap="middle">
								<ExclamationCircleOutlined style={{ color: "orange" }} />
								<Typography.Text>{item?.name}</Typography.Text>
							</Flex>
							<Flex gap={5}>
								<Button
									type="primary"
									onClick={() => updateTodo(item?.id as number)}
									loading={isLoading}
								>
									Complete
								</Button>
								<Button
									style={{ border: "none" }}
									onClick={() => deleteTodo(item?.id as number)}
									loading={isLoading}
								>
									<DeleteOutlined style={{ color: "red" }} />
								</Button>
							</Flex>
						</List.Item>
					)}
				/>
			</Card>
			<Divider />
			<Card title="Done" loading={isLoading}>
				<List
					itemLayout="vertical"
					dataSource={completedTodo}
					renderItem={(item) => (
						<List.Item
							style={{
								width: "100%",
								display: "flex",
								justifyContent: "space-between",
							}}
						>
							<Flex align="center" gap="middle">
								<CheckCircleOutlined style={{ color: "green" }} />
								<Typography.Text
									style={{ color: "gray", textDecoration: "line-through" }}
								>
									{item?.name}
								</Typography.Text>
							</Flex>
						</List.Item>
					)}
				/>
			</Card>
		</Form>
	);
};

export default TodoList;
