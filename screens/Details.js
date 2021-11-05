import React,{Component} from 'react'
import {View,Text,FlatList,StyleSheet,Alert,SafeAreaView} from 'react-native'
import axios from 'axios'
import {Card,Icon} from 'react-native-elements'

export default class Details extends Component{
    constructor(props){
        super(props)
        this.state={
            details:{},
            imagePath:'',
            url:`http://127.0.0.1:5000/stardata?Name=${this.props.navigation.getParam("Star_name")}`
        }
    }

    setDetails=(starDetails)=>{
        const starname = starDetails.Star_name
        let imagePath = ''
        switch(starname){
            case 'Sun':
                imagePath = require('../assets/NASA-Sun.jpg')
                break;
            default:
                imagePath = require('../assets/142894904-unknown-planet-with-satellites-vector-linear-icon-space-science-or-fiction-literature-symbol-.jpg')
                break;
        }
        this.setState({
            details:starDetails,
            imagePath:imagePath
        })
    }

    getDetails=()=>{
        const {url} = this.state
        axios
        .get(url)
        .then(response=>{
            this.setDetails(response.data.data)
        })
        .catch(error=>{
            Alert.alert(error.message)
        })
    }

    componentDidMount(){
        this.getDetails()
    }

    render(){
        const {details,imagePath} = this.state
        if(details.Name){
            return(
                <View style = {styles.container}>
                    <Card title =  {details.Name}
                    image = {imagePath}
                    imageProps = {{resizeMode:'contain',width:'100%'}}>
                        <View>
                            <Text style = {styles.cardItem}>
                                {`Distance : ${details.Distance}`}
                            </Text>
                            <Text style = {styles.cardItem}>
                                {`Gravity: ${details.Gravity}`}
                            </Text>
                            <Text style = {styles.cardItem}>
                                {`planet mass: ${details.Mass}`}
                            </Text>
                            <Text style = {styles.cardItem}>
                                {`planet_radius: ${details.Radius}`}
                            </Text>
                        </View>
                    </Card>
                </View>
            )
        }
        return null
    }
}

const styles = StyleSheet.create({ 
    container: { flex: 1 }, 
    cardItem: { marginBottom: 10 } 
});