showStartDateTimePicker = () => this.setState({ startDateTimePickerVisible: true });

showEndDateTimePicker = () => this.setState({ endDateTimePickerVisible: true });

hideStartDateTimePicker = () => this.setState({ startDateTimePickerVisible: false });

hideEndDateTimePicker = () => this.setState({ endDateTimePickerVisible: false });

handleStartDatePicked = (date) => {
this.setState({startDate:formatDate(date.toLocaleString())});
this.hideStartDateTimePicker();
};

handleEndDatePicked = (date) => {
    this.setState({endDate:formatDate(date.toLocaleString())});
    this.hideEndDateTimePicker();
};

const Saring = () => (
<View style={{flex: 1, flexDirection:"row", justifyContent:"center", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap",marginLeft:5,marginRight:5}}> 
    <TouchableOpacity onPress={this.showStartDateTimePicker}>
    <Text>Dari: {this.state.startDate} </Text>
    {console.warn(this.state.startDate)}
    </TouchableOpacity>
    
    <TouchableOpacity onPress={this.showEndDateTimePicker}>
    <Text>Hingga: {this.state.endDate}</Text>
    </TouchableOpacity>

    <Button mode="contained" color="#900" onPress={()=>console.warn("Saring")} >Saring</Button>

    <DateTimePicker
    isVisible={this.state.startDateTimePickerVisible}
    onConfirm={this.handleStartDatePicked}
    onCancel={this.hideStartDateTimePicker}
    />
    <DateTimePicker
    isVisible={this.state.endDateTimePickerVisible}
    onConfirm={this.handleEndDatePicked}
    onCancel={this.hideEndDateTimePicker}
    />
</View>
)