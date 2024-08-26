import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './nicepage.css';
import './Dashboard.css';
import Header from './Header';

const ViewEstimates = () => {
    const HeaderMenu = () => {
        const navigate = useNavigate();
        const location = useLocation();
        const { estimateId } = useParams();
        const role = location.state?.role || '';
        const pmId = location.state?. pmId || '';
        console.log("pmId = ",pmId);
        const totalCost = location.state?.totalCost || 0;
        const products = location.state.estimate_data_selected || [];
        const eventId = location.state.eventId;
        const pmName = location.state?.pmName || 'Unknown PM';
        const companyName = location.state?.companyName || 'Unknown Company';
        const handleBack = (e) => {
            e.preventDefault();
            navigate(`/dashboard/showestimates/${eventId}`,
            {state:
                {
                    pmId : pmId,
                    role: role,
                    pmName : pmName,
                    companyName : companyName,
                }
            });
        }
        return (
        <div className="product-cart-container">
            <div className="container">
                <div className="row">
                    <div className="col-md-12 clearfix">
                        <h2 className="section-head">{role == 1 ? 'VIEW ESTIMATE CART (CLIENT SIDE)' : 'VIEW ESTIMATE CART (PM SIDE)'}</h2>
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>IMAGE</th>
                                    <th>ELEMENT</th>
                                    <th>SIZE</th>
                                    <th width="120px">COST</th>
                                    <th width="100px">QTY</th>
                                    <th width="100px">SUB TOTAL</th>
                                    {role === 1 && <th>Action</th>}
                                </tr>
                            </thead>
                            <tbody>
                                {products.length > 0 ? (
                                    products.map(product => (
                                        <tr key={product.id} className="item-row">
                                            <td>
                                                <img src={product.image_url} alt={product.ELEMENT} style={{ width: '100px' }} />
                                            </td>
                                            <td>{product.ELEMENT}</td>
                                            <td>{product.SIZE}</td>
                                            <td>
                                                <span className="product-price">{product.COST}</span>
                                            </td>
                                            <td>
                                                <span
                                                    className="product-qty"
                                                >{product.QTY}</span>
                                            </td>
                                            <td>
                                                {product.SUB_TOTAL}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                        <tr>
                                            <td colSpan={role === 1 ? 7 : 6} className="text-center">No products available</td>
                                        </tr>
                                    )}
                                <tr>
                                    <td colSpan={role === 1 ? 6 : 5} className="text-end"><strong>Total Cost:</strong></td>
                                    <td>
                                        <strong>{totalCost}</strong>
                                    </td>
                                    {role === 1 && <td></td>}
                                </tr>
                            </tbody>
                        </table>
                        <button className = "btn btn-success btn-lg" onClick = { (e) => handleBack(e)}>BACK</button>
                        <button className = "btn btn-primary btn-lg ms-4">Approve</button>
                    </div>
                </div>
            </div>
        </div>
        );
    }
   
    return (
        <>
            <div className="u-body u-xl-mode" data-lang="en">
                <Header imagTag='../../../../' />
            </div>
            <HeaderMenu />
        </>
    );

}
export default ViewEstimates;