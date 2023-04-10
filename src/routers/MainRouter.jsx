import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Home } from '../components/views/Home/Home';
import { Templates } from '../components/views/Templates/Templates';
import { Documents } from '../components/views/Documents/Documents';

export const MainRouter = () => {
	return (
		<Routes>
			<Route exact path="/" element={<Home />}></Route>
			<Route exact path="/templates" element={<Templates />}></Route>
			<Route exact path="/documentos" element={<Documents />}></Route>
		</Routes>
	);
};
