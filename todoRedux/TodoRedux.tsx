// import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, AppState } from "../reduxFlow/store";
// import {  DeleteTodo, EditTodo, ProductDetails, getProducts, loginUser } from "../reduxFlow/reducers/TodoSlice";

// export default function TodoRedux() {
//     const [currentPage , setCurrentPage] = useState(1)
//     const [productsData,setProductsData] = useState<ProductDetails[]>([])
//     // const [productTotalPages,setProductTotalPages] = useState(0)
//     const todos = useSelector((states:AppState) => states.TodoSlice.todos)
//     const products = useSelector((states:AppState) => states.TodoSlice.productsData)
//     const totalPages = useSelector((states:AppState) => states.TodoSlice.totalPages)
//     const dispatch = useDispatch<AppDispatch>()

//     const getApiProducts = async () => {
//       setTimeout(async () => {
//         await dispatch(getProducts({currentPage}));
//       }, 500);
//     };
//     useEffect(() => {
//         setProductsData(products);
//     },[products])
//     const handleApiCalls = async() => {
//         await dispatch(loginUser())
//         getApiProducts()
//     }
//     useEffect(() => {
//         handleApiCalls()
//     },[])

//     const getAllProductsAtOnce = async () => {
//        await dispatch(getProducts({currentPage:currentPage}))
//         setProductsData([...productsData,...products])
//     }
//     const callApiForInfiniteScroll = () => { 
//         setCurrentPage(currentPage+1)
//         getAllProductsAtOnce()
//     }
//     const bottomLoading = () =>{
//         callApiForInfiniteScroll()
//     }
//     const loadMoreData = () => {
//         if(currentPage < totalPages){
//             bottomLoading()
//         }
//     }
//     const listFooterComponent = () => {
//         return(
//             <ActivityIndicator size={'large'} style={{marginVertical:20}}/>
//         )
//     }
//   return (
//     <View style={{flex:1}}>
//         {/* <FlatList 
//         data={todos}
//         renderItem={({item,index}) => {
//             return(
//                 <View style={{flexDirection:"row",justifyContent:"space-between",marginHorizontal:30,marginTop:30,alignItems:"center"}}>
//                     <Text style={{fontSize:18}} numberOfLines={1}>{item.text}</Text>
//                     <View style={{flexDirection:"row",justifyContent:"space-between",width:150}}>
//                     <TouchableOpacity style={{backgroundColor:"#000000",padding:10}} onPress={() => dispatch(DeleteTodo(item.id))}>
//                         <Text style={{color:"white"}}>Delete</Text>
//                     </TouchableOpacity>
//                     <TouchableOpacity style={{backgroundColor:"#000000",padding:10}} onPress={() => dispatch(EditTodo({editId:item.id,text:item.text}))}>
//                         <Text  style={{color:"white"}}>Update</Text>
//                     </TouchableOpacity>
//                     </View>
//                 </View>
//             )
//         }}
//         /> */}
//          <FlatList 
//         data={productsData}
//         initialNumToRender={5}
//         contentContainerStyle={{marginBottom:40}}
//         onEndReachedThreshold={0.3}
//         onEndReached={loadMoreData}
//         ListFooterComponent={listFooterComponent}
//         renderItem={({item}) => {
//             return(
//                 <View style={{flexDirection:"row",justifyContent:"space-between",marginHorizontal:30,marginTop:50,alignItems:"center",backgroundColor:"white",padding:10}}>
//                     <Text style={{fontSize:18}} numberOfLines={1}>{item.description}</Text>
//                     <View style={{flexDirection:"row",justifyContent:"space-between",width:150}}>
//                         <Text numberOfLines={1}>{item.id}</Text>
//                         <Text numberOfLines={1}>{item.name}</Text>
//                     </View>
//                 </View>
//             )
//         }}
//         />
//     </View>
//   );
// }


import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "../reduxFlow/store";
import { DeleteTodo, EditTodo, ProductDetails, getProducts, loginUser } from "../reduxFlow/reducers/TodoSlice";

export default function TodoRedux() {
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [productsData, setProductsData] = useState<ProductDetails[]>([]);
    const [pageCount, setPageCount] = useState(0)
    const todos = useSelector((states: AppState) => states.TodoSlice.todos);
    const products = useSelector((states: AppState) => states.TodoSlice.productsData);
    const totalPages = useSelector((states: AppState) => states.TodoSlice.totalPages);
    const dispatch = useDispatch<AppDispatch>();

    const getApiProducts = async () => {
        setTimeout(async () => {
            await dispatch(getProducts({ currentPage:currentPage }));
            setLoading(false)
            // console.log("calleddddddddd")
            // setProductsData([...productsData,...products])
            // setPageCount(totalPages)
        }, 500);
    };

    useEffect(() => {
        // setProductsData([...productsData,...products])
        setProductsData(prevProductsData => {
            const newProducts = products.filter(product => !prevProductsData.some(p => p.id === product.id));
            return [...prevProductsData, ...newProducts];
        });
    }, [products]);
    // useEffect(() => {
    //     setPageCount(totalPages)
    // }, [totalPages]);
    

    const handleApiCalls = async () => {
        await dispatch(loginUser());
        getApiProducts();
    };

    useEffect(() => {
        setLoading(true)
        handleApiCalls();
    }, []);

    const getAllProductsAtOnce = async () => {
        await dispatch(getProducts({ currentPage }));
        // setProductsData(prevProductsData => {
        //     const newProducts = products.filter(product => !prevProductsData.some(p => p.id === product.id));
        //     return [...prevProductsData, ...newProducts];
        // });
        setProductsData(prevState => [...prevState,...products])
        setLoading(false)
    };

    const callApiForInfiniteScroll = () => {
        setLoading(true)
        setCurrentPage(prevState => prevState+1);
        getAllProductsAtOnce();
    };

    const bottomLoading = () => {
        callApiForInfiniteScroll();
    };

    const loadMoreData = () => {
        if (currentPage < totalPages) {
            setLoading(true)
            bottomLoading();
        }
    };

    const listFooterComponent = () => {
       if(loading){
        return (
            <ActivityIndicator size={'large'} style={{ marginVertical: 20 }} />
        );
       } 
    };

    console.log(pageCount,"==>count")

    return (
        <View style={{ flex: 1 }}>
            {/* <FlatList 
            data={todos}
            renderItem={({ item, index }) => {
                return (
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginHorizontal: 30, marginTop: 30, alignItems: "center" }}>
                        <Text style={{ fontSize: 18 }} numberOfLines={1}>{item.text}</Text>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", width: 150 }}>
                            <TouchableOpacity style={{ backgroundColor: "#000000", padding: 10 }} onPress={() => dispatch(DeleteTodo(item.id))}>
                                <Text style={{ color: "white" }}>Delete</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ backgroundColor: "#000000", padding: 10 }} onPress={() => dispatch(EditTodo({ editId: item.id, text: item.text }))}>
                                <Text style={{ color: "white" }}>Update</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )
            }}
            /> */}
            <FlatList
                data={productsData}
                initialNumToRender={5}
                contentContainerStyle={{ marginBottom: 40 }}
                onEndReachedThreshold={0.3}
                onEndReached={loadMoreData}
                ListFooterComponent={listFooterComponent}
                renderItem={({ item }) => {
                    return (
                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginHorizontal: 30, marginTop: 50, alignItems: "center", backgroundColor: "white", padding: 10 }}>
                            <Text style={{ fontSize: 18,width:150 }} numberOfLines={1}>{item.description}</Text>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", width: 150 }}>
                                <Text numberOfLines={1}>{item.id}</Text>
                                <Text numberOfLines={1}>{item.name}</Text>
                            </View>
                        </View>
                    );
                }}
            />
        </View>
    );
}
