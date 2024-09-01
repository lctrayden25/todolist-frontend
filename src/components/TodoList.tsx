import {
	Button,
	Card,
	Flex,
	Form,
	Input,
	List,
	Typography,
	Divider,
	Tag,
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
	const [form] = Form.useForm();
	const {
		createTodo,
		updateTodo,
		deleteTodo,
		deleteAllTodo,
		todoItems,
		isLoading,
	} = useTodoAction(form);

	const incompletedTodo = useMemo(() => {
		return todoItems?.filter((todo) => todo.status !== "complete");
	}, [todoItems]);

	const completedTodo = useMemo(() => {
		return todoItems?.filter((todo) => todo.status === "complete");
	}, [todoItems]);

	return (
		<Form
			onFinish={createTodo}
			initialValues={{ todo: "" }}
			autoComplete="off"
			style={{ width: "100%" }}
			form={form}
		>
			<Flex gap={20}>
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
			<Card
				title={
					<Tag color="orange" style={{ fontSize: "15px" }}>
						Todo : {incompletedTodo?.length}
					</Tag>
				}
				loading={isLoading}
				extra={
					<Button onClick={() => deleteAllTodo("incomplete")}>Clear</Button>
				}
			>
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
							<Flex gap={5} align="center">
								<Tag
									bordered={false}
									color="blue"
									onClick={() => updateTodo(item?.id as number)}
									style={{ cursor: "pointer" }}
								>
									Set to done
								</Tag>
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
			<Card
				title={
					<Tag color="green" style={{ fontSize: "15px" }}>
						Done : {completedTodo?.length}
					</Tag>
				}
				loading={isLoading}
				extra={<Button onClick={() => deleteAllTodo("complete")}>Clear</Button>}
			>
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
