import React, { Component, useEffect } from 'react'
import { actFetchProductsRequest, AddCart } from '../actions'
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import AddShoppingCartRoundedIcon from '@material-ui/icons/AddShoppingCartRounded';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

const Product = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(actFetchProductsRequest());
    }, [])
    const getAllProducts = useSelector((state) => state.Products._products);
    const Carts = useSelector((state) => state.Products.Carts);
    const classes = useStyles();
    console.log("Products", getAllProducts)
    if (getAllProducts.length > 0) {

        return (<>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Product</TableCell>
                            <TableCell align="left">Image</TableCell>
                            <TableCell align="left">Price</TableCell>
                            <TableCell align="left">Add To Cart</TableCell>
                        </TableRow>
                    </TableHead>
                    {
                        getAllProducts.map((item, index) => (
                            <TableBody>
                                <TableRow key={index}>
                                    <TableCell component="th" scope="row">
                                        {item.name}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        <img src={item.image} width="100" height="100" />
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        ₹{item.price}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {
                                            Carts.length > 0 ?
                                                item.is_product_has_cart == false ?
                                                    (<Link to="/carts">
                                                        <AddShoppingCartRoundedIcon onClick={() => {
                                                            item['is_product_has_cart'] = true
                                                            dispatch(AddCart(item)); console.log("Items", item)
                                                        }} />
                                                    </Link>)
                                                    :
                                                    Carts.map((itemCart) => {
                                                        if (itemCart.id == item.id && itemCart.is_product_has_cart == true) {
                                                            return (
                                                                <Button variant="contained" color="secondary" disabled>
                                                                    already added in cart
                                                                </Button>
                                                            )
                                                        }
                                                    })
                                                :
                                                (<Link to="/carts">
                                                    <AddShoppingCartRoundedIcon onClick={() => {
                                                        item['is_product_has_cart'] = true
                                                        dispatch(AddCart(item)); console.log("Items", item)
                                                    }} />
                                                </Link>)
                                        }
                                    </TableCell>

                                </TableRow>
                            </TableBody>
                        ))}
                </Table>
            </TableContainer>
        </>
        )
    }
    return (
        <>
            <CircularProgress />
        </>
    )

}
export default Product;
