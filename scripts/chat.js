ChatUIManager = function(onlineMembers, chatContent, textInput, buttonInput) {
	var that = this;
	this.onlineMembersDiv = onlineMembers;
	this.contentDiv = chatContent;
	this.textInput = textInput;
	this.buttonInput = buttonInput;
	this.onlineMembersStack = [];

	$(this.buttonInput).click(function() {
		var textToBeAdded = that.textInput.value;
		console.log(textToBeAdded);
		$(that.contentDiv).append(textToBeAdded + "<br>").scrollTop($(that.contentDiv)[0].scrollHeight);
	})
}

ChatUIManager.prototype.memberJoined = function(nickname, joiningTime) {
	// memberInfo = { name: nickname, time: joiningTime }
	this.onlineMembersStack.push(nickname);
	var memberSpanId = "_chat_" + nickname;
	$(this.onlineMembersDiv).append($("<span id=" + memberSpanId  + ">" + nickname + "<br><span>"))
}

ChatUIManager.prototype.memberLeft = function(nickname, leavingTime) {
	var index = this.onlineMembersStack.indexOf(nickname);
	this.onlineMembersStack.splice(index, 1);
	var memberSpanId = "_chat_" + nickname;
	$("#" + memberSpanId).remove();
}

ChatUIManager.prototype.messageReceived = function(nickname, messageContent) {
	var time = new Date().toString().slice(16, 24);
	$(this.contentDiv).append("<br><b>" + time + "</b><br><b>" + nickname + ":</b> " + messageContent).scrollTop($(this.contentDiv)[0].scrollHeight);
}

