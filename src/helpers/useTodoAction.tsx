import { FormInstance, message } from "antd";
import { useCallback, useEffect, useState } from "react";
import { API_URL } from "./constant";

export type TodoData = {
	id: string | number;
	name: string;
	status: string;
};

export type TodoType = {
	todo: string;
};

export const useTodoAction = (form: FormInstance) => {
	const [todoItems, setTodoItems] = useState<TodoData[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const fetchTodoList = useCallback(async (): Promise<void> => {
		try {
			setIsLoading(true);
			const res = await fetch(`${API_URL}/`);
			const resData = await res?.json();
			if (resData) {
				setTodoItems(resData?.data);
				setIsLoading(false);
			}
		} catch (error: unknown) {
			if (error instanceof Error) {
				message.error(error.message);
			}
			setIsLoading(false);
		} finally {
			setIsLoading(false);
		}
	}, []);

	const createTodo = useCallback(
		async (values: TodoType): Promise<void> => {
			try {
				setIsLoading(true);
				const res = await fetch(`${API_URL}/`, {
					method: "POST",
					body: JSON.stringify({ name: values?.todo }),
					headers: {
						"Content-Type": "application/json",
					},
				});

				const resData = await res?.json();
				if (resData) {
					await fetchTodoList();
					setIsLoading(false);
					form.setFieldValue("todo", "");
				}
			} catch (error) {
				if (error instanceof Error) {
					message.error(error.message);
				}
				setIsLoading(false);
			} finally {
				setIsLoading(false);
			}
		},
		[fetchTodoList, form]
	);

	const updateTodo = useCallback(
		async (id: number): Promise<void> => {
			try {
				setIsLoading(true);
				const res = await fetch(`${API_URL}/${id}`, {
					method: "put",
					body: JSON.stringify({ status: "complete" }),
				});
				const resData = await res?.json();
				if (resData) {
					await fetchTodoList();
				}
			} catch (error) {
				if (error instanceof Error) {
					message.error(error.message);
				}
				setIsLoading(false);
			} finally {
				setIsLoading(false);
			}
		},
		[fetchTodoList]
	);

	const deleteTodo = useCallback(
		async (id: number): Promise<void> => {
			try {
				const res = await fetch(`${API_URL}/id/${id}`, {
					method: "DELETE",
				});
				const resData = await res?.json();
				if (resData && !resData?.error) {
					await fetchTodoList();
				}
			} catch (error) {
				if (error instanceof Error) {
					message.error(error.message);
				}
				setIsLoading(false);
			}
		},
		[fetchTodoList]
	);

	const deleteAllTodo = useCallback(
		async (status: string) => {
			try {
				const res = await fetch(`${API_URL}/status/${status}`, {
					method: "DELETE",
				});
				const resData = await res?.json();
				if (resData && !resData?.error) {
					await fetchTodoList();
					message.success(`Clear all ${status} todo items.`);
				}
			} catch (error) {
				if (error instanceof Error) {
					message.error(error.message);
				}
				setIsLoading(false);
			}
		},
		[fetchTodoList]
	);

	useEffect(() => {
		fetchTodoList();
	}, [fetchTodoList]);

	return {
		fetchTodoList,
		createTodo,
		updateTodo,
		deleteTodo,
		deleteAllTodo,
		todoItems,
		isLoading,
	};
};
