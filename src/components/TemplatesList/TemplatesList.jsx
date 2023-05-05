import React from 'react';
import { useState, useEffect } from 'react';
import { getAvailableTemplates } from '../../services/getAvailableTemplates';
import {
	DataTable,
	TableContainer,
	TableToolbar,
	TableToolbarContent,
	TableToolbarSearch,
	TableToolbarMenu,
	TableToolbarAction,
	Table,
	TableHead,
	TableHeader,
	TableBody,
	TableRow,
	TableCell,
	Breadcrumb,
	BreadcrumbItem,
	Button,
} from '@carbon/react';

const TemplatesList = () => {
	const [availableTemplates, setAvailableTemplates] = useState(null);
	const [folderShown, setFolderShown] = useState(null);
	const [selectedFolder, setSelectedFolder] = useState('root');
	const [tableData, setTableData] = useState([]);
	const [breadCrumbsList, setBreadCrumbsList] = useState([]);

	const tableHeaders = [{ key: 'name', header: 'Name' }];

	useEffect(() => {
		async function getTemplates() {
			//TODO: Change the hardcoded user mail for the user context
			let result = await getAvailableTemplates('pakeperez@gmail.com');
			setAvailableTemplates(result);
		}
		getTemplates();
	}, []);

	useEffect(() => {
		if (availableTemplates) {
			setFolderShown(availableTemplates);
			setBreadCrumbsList([{ name: 'root', content: availableTemplates }]);
		}
	}, [availableTemplates]);

	useEffect(() => {
		if (folderShown) {
			let templateItems = Object.keys(folderShown);
			let newRows = [];
			//TODO: Change the hardcoded user mail for the user context
			let user = 'pakeperez@gmail.com';
			templateItems.forEach((item, i) => {
				if (item === 'documents') {
					let documents = folderShown[item];
					documents.forEach((document, j) => {
						newRows.push({ id: `doc-${j}`, name: document });
					});
				} else {
					let itemName = item === user + '/' ? 'My Templates' : item.split('/')[0];
					newRows.push({ id: 'row-' + i, name: itemName, isFolder: true, item });
				}
			});
			setTableData(newRows);
		}
	}, [folderShown]);

	const onRowClick = (event, row) => {
		//On Double Click
		if (event.detail === 2) {
			let clickedRow = row.id.split('-')[1];
			let rowData = tableData[clickedRow];
			if (rowData.isFolder) {
				console.log(folderShown[rowData.item]);
				let currentBreadCrumbList = [...breadCrumbsList];
				currentBreadCrumbList.push({ name: rowData.name, content: folderShown[rowData.item] });
				console.log(currentBreadCrumbList);
				setBreadCrumbsList(currentBreadCrumbList);
				setFolderShown(folderShown[rowData.item]);
			}
		}
	};

	const onBreadCrumbClick = (breadCrumbItem, index) => {
		//When clicking on other breadcrumb than the last one
		if (index < breadCrumbsList.length - 1) {
			let currentBreadCrumbList = [...breadCrumbsList];
			let newBreadCrumbs = currentBreadCrumbList.slice(0, index + 1);
			setBreadCrumbsList(newBreadCrumbs);
		}
		setFolderShown(breadCrumbItem.content);
	};

	const action = (event) => {
		console.log(event.target);
	};

	return (
		<>
			{breadCrumbsList.length > 0 ? (
				<Breadcrumb>
					{breadCrumbsList.map((breadCrumbItem, i) => (
						<BreadcrumbItem key={`bread-crum-${i}`} onClick={(e) => onBreadCrumbClick(breadCrumbItem, i)}>
							{breadCrumbItem.name}
						</BreadcrumbItem>
					))}
				</Breadcrumb>
			) : null}

			<br></br>
			{tableData ? (
				<DataTable rows={tableData} headers={tableHeaders}>
					{({ rows, headers, getHeaderProps, getRowProps, getTableProps, getToolbarProps, onInputChange, getTableContainerProps, testClick }) => (
						<TableContainer {...getTableContainerProps()}>
							<TableToolbar {...getToolbarProps()} aria-label="data table toolbar">
								<TableToolbarContent>
									<TableToolbarSearch
										onChange={onInputChange}
										onClear={action}
										onFocus={(event, handleExpand) => {
											action;
											handleExpand(event, true);
										}}
										onBlur={(event, handleExpand) => {
											action;
											const { value } = event.target;
											if (!value) {
												handleExpand(event, false);
											}
										}}
									/>
									<TableToolbarMenu light>
										<TableToolbarAction onClick={action}>Action 1</TableToolbarAction>
										<TableToolbarAction onClick={action}>Action 2</TableToolbarAction>
										<TableToolbarAction onClick={action}>Action 3</TableToolbarAction>
									</TableToolbarMenu>
									<Button onClick={action}>Primary Button</Button>
								</TableToolbarContent>
							</TableToolbar>
							<Table>
								<TableHead>
									<TableRow>
										{headers.map((header) => (
											<TableHeader id={header.key} key={header} {...getHeaderProps({ header })}>
												{header.header}
											</TableHeader>
										))}
									</TableRow>
								</TableHead>
								<TableBody>
									{rows
										? rows.map((row) => {
												return (
													<TableRow
														key={row.id}
														{...getRowProps({ row })}
														onClick={(e) => {
															onRowClick(e, row);
														}}
													>
														{row.cells.map((cell) => {
															return <TableCell key={cell.id}>{cell.value}</TableCell>;
														})}
													</TableRow>
												);
										  })
										: null}
								</TableBody>
							</Table>
						</TableContainer>
					)}
				</DataTable>
			) : null}
		</>
	);
};

export default TemplatesList;
