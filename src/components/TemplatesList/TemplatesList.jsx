import React from 'react';
import { useState, useEffect } from 'react';
import { getAvailableTemplates } from '../../services/getAvailableTemplates';
import { Table, TableHead, TableHeader, TableBody, TableRow, TableCell, Breadcrumb, BreadcrumbItem } from '@carbon/react';

const TemplatesList = () => {
	const [availableTemplates, setAvailableTemplates] = useState(null);
	const [folderShown, setFolderShown] = useState(null);
	const [selectedFolder, setSelectedFolder] = useState('root');
	const [tableData, setTableData] = useState([]);
	const [breadCrumbsList, setBreadCrumbsList] = useState([]);

	const tableHeaders = ['Name'];
	const hiddenCols = ['id', 'isFolder', 'item'];

	useEffect(() => {
		async function getTemplates() {
			//TODO: Change the hardcoded user mail for the user context
			let result = await getAvailableTemplates('pakeperez@gmail.com');
			console.log(result);
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
					newRows.push({ id: i, name: itemName, isFolder: true, item });
				}
			});
			setTableData(newRows);
		}
	}, [folderShown]);

	const onRowClick = (event, row) => {
		//On Double Click
		if (event.detail === 2) {
			if (row.isFolder) {
				console.log(folderShown[row.item]);
				let currentBreadCrumbList = [...breadCrumbsList];
				currentBreadCrumbList.push({ name: row.name, content: folderShown[row.item] });
				console.log(currentBreadCrumbList);
				setBreadCrumbsList(currentBreadCrumbList);
				setFolderShown(folderShown[row.item]);
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
			<Table>
				<TableHead>
					<TableRow>
						{tableHeaders.map((header) => (
							<TableHeader id={header.key} key={header}>
								{header}
							</TableHeader>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{tableData.map((row) => (
						<TableRow key={row.id} onClick={(event) => onRowClick(event, row)}>
							{Object.keys(row)
								.filter((key) => !hiddenCols.includes(key))
								.map((key) => {
									return <TableCell key={key}>{row[key]}</TableCell>;
								})}
						</TableRow>
					))}
				</TableBody>
			</Table>
		</>
	);
};

export default TemplatesList;
