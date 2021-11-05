import React,{Component} from 'react'
import {View,Text,FlatList,StyleSheet,Alert,SafeAreaView} from 'react-native'
import {ListItem} from 'react-native-elements'
import axios from 'axios'

export default class Home extends Component{
    constructor(props){
        super(props)
        this.state={
            listData:[],
            url:'http://127.0.0.1:5000/'
        }
    }

    getPlanets = ()=>{
        const {url} = this.state
        axios
        .get(url)
        .then(response=>{
            return this.setState({
                listData:response.data.data
            })
        })
        .catch(error=>{
            Alert.alert(error.message)
        })
    }

    renderItem = ({item,index})=>(
        <ListItem
        key = {index}
        title = {`Star:${item.Name}`}
        subtitle = {`Distance :${item.Distance}`}
        titleStyle = {styles.title}
        containerStyle = {styles.listContainer}
        bottomDivider
        chevron
        onPress = {()=>{
            this.props.navigation.navigate('Details',{Star_name:item.Name})
        }}/>
    )

    keyExtractor = (item,index)=>index.toString()

    componentDidMount(){
        this.getPlanets()
    }

    render(){
        const {listData} = this.state
        if(listData.length === 0){
            return(
                <View style = {styles.emptyContainer}>
                    <Text>Loading....</Text>
                </View>
            )
        }

        return(
            <View style = {styles.container}>
                <SafeAreaView/>
                    <View style = {styles.upperContainer}>
                        <Text style = {styles.headerText}>Star App</Text>
                    </View>
                    <View style = {styles.lowerContainer}>
                        <FlatList
                         keyExtractor = {this.keyExtractor}
                         renderItem = {this.renderItem}
                         data= {this.state.listData}/>
                    </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({ 
    container: { 
        flex: 1, 
        backgroundColor: "#edc988" 
    }, 
    upperContainer: { 
        flex: 0.1, 
        justifyContent: "center", 
        alignItems: "center" 
    }, 
    headerText: { 
        fontSize: 30, 
        fontWeight: "bold", 
        color: "#132743" 
    }, 
    lowerContainer: { 
        flex: 0.9 
    }, 
    emptyContainer: { 
        flex: 1, 
        justifyContent: "center", 
        alignItems: "center" 
    }, 
    emptyContainerText: { 
        fontSize: 20 
    }, 
    title: { 
        fontSize: 18, 
        fontWeight: "bold", 
        color: "#d7385e" 
    }, 
    listContainer: { 
        backgroundColor: "#eeecda" 
    } 
});