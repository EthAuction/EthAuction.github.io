var useraccount = '';
var contractadd = '0x5ce96A01a36c7862Efaf68cFA01F351DcC4c3Ca4';
var contractabi = [{"inputs": [],"stateMutability": "payable","type": "constructor"},{"anonymous": false,"inputs": [{"indexed": true,"internalType": "address","name": "add","type": "address"},{"indexed": true,"internalType": "uint256","name": "roundCount","type": "uint256"},{"indexed": true,"internalType": "uint256","name": "payNumber","type": "uint256"},{"indexed": false,"internalType": "uint256","name": "amount","type": "uint256"}],"name": "onNewBid","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"internalType": "uint256","name": "roundCount","type": "uint256"},{"indexed": false,"internalType": "uint256","name": "price","type": "uint256"}],"name": "onNewRound","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"internalType": "address","name": "add","type": "address"},{"indexed": true,"internalType": "uint256","name": "roundCount","type": "uint256"},{"indexed": false,"internalType": "uint256","name": "bid","type": "uint256"},{"indexed": false,"internalType": "uint256","name": "price","type": "uint256"}],"name": "onNewWinner","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"internalType": "address","name": "add","type": "address"},{"indexed": false,"internalType": "uint256","name": "amount","type": "uint256"}],"name": "onWithdraw","type": "event"},{"inputs": [{"internalType": "uint256","name": "bidValue","type": "uint256"}],"name": "bid","outputs": [],"stateMutability": "payable","type": "function"},{"inputs": [],"name": "getBalance","outputs": [{"internalType": "uint256","name": "balance","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "add","type": "address"}],"name": "getBalance","outputs": [{"internalType": "uint256","name": "balance","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "add","type": "address"}],"name": "getBalanceIfBid","outputs": [{"internalType": "uint256","name": "balance","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "round","type": "uint256"},{"internalType": "uint256","name": "payment","type": "uint256"}],"name": "getBid","outputs": [{"internalType": "uint256","name": "amount","type": "uint256"},{"internalType": "uint256","name": "timestamp","type": "uint256"},{"internalType": "address","name": "add","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "round","type": "uint256"}],"name": "getBidCount","outputs": [{"internalType": "uint256","name": "count","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "getBidTimeout","outputs": [{"internalType": "uint256","name": "bidtimeout","type": "uint256"}],"stateMutability": "pure","type": "function"},{"inputs": [{"internalType": "uint256","name": "round","type": "uint256"}],"name": "getHighestBidder","outputs": [{"internalType": "address","name": "add","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "round","type": "uint256"}],"name": "getMinBet","outputs": [{"internalType": "uint256","name": "amount","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "getMinBet","outputs": [{"internalType": "uint256","name": "amount","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "getNextPricePool","outputs": [{"internalType": "uint256","name": "amount","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "getPrice","outputs": [{"internalType": "uint256","name": "amount","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "round","type": "uint256"}],"name": "getPrice","outputs": [{"internalType": "uint256","name": "amount","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "round","type": "uint256"}],"name": "getRemainTime","outputs": [{"internalType": "uint256","name": "time","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "getRoundCount","outputs": [{"internalType": "uint256","name": "count","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "round","type": "uint256"}],"name": "getWinner","outputs": [{"internalType": "uint256","name": "lastbid","type": "uint256"},{"internalType": "uint256","name": "price","type": "uint256"},{"internalType": "address","name": "add","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "isCurrentRoundOver","outputs": [{"internalType": "bool","name": "finished","type": "bool"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "datetime","type": "uint256"}],"name": "isCurrentRoundOver","outputs": [{"internalType": "bool","name": "finished","type": "bool"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "update","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "withdraw","outputs": [],"stateMutability": "nonpayable","type": "function"}];
var apicount = 0;
var blocksuntilstart = 1;
var lasttotalpayouts = -1;
//var accountlink = "https://etherscan.io/address/";
var accountlink = "https://ropsten.etherscan.io/address/";
var laststatus = '';
var contractbalance = 0.0;
var blocksuntilreset = -1;
var etherauction = null;
var autouseraccount = false;

var nullAddress = "0x0000000000000000000000000000000000000000";

var bidtimeout = 3600 * 24;
var lastMinBet = 0;
var lastRound = -1;
var lastPayCount = -1;
var lasttimeout = -1;
var curTimeout = 0;
var ethProv;
function init() {
    try {
    console.log('starting...');
    if (typeof web3 !== 'undefined') {
        ethProv = new Web3(web3.currentProvider);
        ethereum.enable();
    } else {
        ethProv = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/79a0d1652d8640188108922e73cf60cb"));
    }
    console.log(ethProv.version);
    etherauction = new ethProv.eth.Contract(contractabi, contractadd);
    $("#account").text(contractadd);
    $("#account").attr("href", accountlink + contractadd);
    $("#useraccountin").show();
    $("#copyrefsel").show();
    var url = 'https://api.qrserver.com/v1/create-qr-code/?data=' + contractadd + '&size=500x500';
    $('#barcode').attr('src', url);

    $("#payoutb").click(function() {
        ethProv.eth.sendTransaction({
            value: 0,
            to: contractadd
        });
    });
	$("#sendbet").click(function() {
        var betamount = parseInt($("#betamount").val() * 1000000000000000000)
        sendBet(betamount);
    });
    $("#bidmin").click(function() {
        if(useraccount == null || useraccount.length < 2){
            window.open("https://metamask.io/download.html", "_blank");
        }else{
            var betamount = parseInt(lastMinBet)
            sendBet(betamount);
        }
    });
	$("#withdraw").click(function() {
        etherauction.methods.withdraw().send({
            from: useraccount,
            value: 0
        }, function(error, result) {});
    });

    function payoutclick() {
        ethProv.eth.sendTransaction({
            value: 0,
            to: contractadd
        });
    }
    

    etherauction.methods.getBidTimeout().call(
        function(error, result) {
            if (!error) {
                bidtimeout = parseInt(result, 10);
                $('#bidprogress').attr('max',bidtimeout);
            } else
                console.error(error);
        }
    );

    var tid = setInterval(refreshSite, 2000);
    var tid = setInterval(secondly, 1000);

    refreshSite();
    secondly();
    }catch(e){
        alert(e);
    }
}

function sendBet(betamount){
    etherauction.methods.getBalanceIfBid(useraccount).call(
            function(error, result) {
                if (!error) {
                    var sendAmount = betamount - result;
                    if(sendAmount < 0) sendAmount = 0;
                    etherauction.methods.bid(betamount).send({
                        from: useraccount,
                        value: sendAmount
                    }, function(error, result) {});
					 $("#userbalance").html(formatWei(result));
                } else
                    console.error(error);
            }
        );
}
function secondly(){
    if(lastPayCount > 0){
        curTimeout -= 1;
        if(curTimeout < 0) curTimeout  = 0;
        $("#timeleft").html(toHHMMSS(curTimeout));
        $('#bidprogress').val(bidtimeout - curTimeout);
    }
    document.documentElement.style.setProperty('--farbe', getGradientColor("#800000", "#008000", 1.0 * curTimeout / bidtimeout));
    document.documentElement.style.setProperty('--verlauf', "linear-gradient(45deg," + getGradientColors("#800000", "#008000", 1.0 * curTimeout / bidtimeout) + ")");
}
function refreshSite() {
    try {
        ethProv.eth.getAccounts(function(error, result) {
            if (error) {
                $("#sending").hide();
                $("#payout").hide();
                return;
            }
            if (result[0] != null) {
                useraccount = result[0];
                ethProv.eth.defaultAccount = useraccount;
                etherauction.options.from = useraccount;
                $("#useraccount").text(useraccount);
                $("#useraccount").attr("href", accountlink + useraccount + "");
                $("#bidmin").text("Click here to Bet minimum");
            }else{
                useraccount = "";
                $("#bidmin").text("Enable MetaMask for bidding");
            }
        });

        ethProv.eth.getBlockNumber(
            function(error, result) {
                if (!error) {
                    var currentdate = new Date();
                    var datetime = "Last refresh: " + currentdate.getDate() + "/" +
                        (currentdate.getMonth() + 1) + "/" +
                        currentdate.getFullYear() + " @ " +
                        currentdate.getHours() + ":" +
                        currentdate.getMinutes() + ":" +
                        currentdate.getSeconds();
                    $("#lastrefresh").text(datetime + " Block: " + result);
                } else
                    console.error(error);
            }
        );
        etherauction.methods.getPrice(lastRound).call(
            function(error, result) {
                if (!error) {
					 $("#price").html(formatWei(result) + "Ξ");
                } else
                    console.error(error);
            }
        );
		etherauction.methods.getMinBet(lastRound).call(
            function(error, result) {
                if (!error) {
					if(result != lastMinBet){
                        lastMinBet = result;
                        $("#minbetvalue").html(formatWei(result) + "Ξ");
                        $("#betamount").val(parseFloat(ethProv.utils.fromWei(result, 'ether')).toFixed(9));
                    }
                } else
                    console.error(error);
            }
        );
		etherauction.methods.getHighestBidder(lastRound).call(
            function(error, result) {
                if (!error) {
                    $("#highestbidder").text(result);
                    $("#highestbidder").attr("href", accountlink + result + "");
                     if(result.toLowerCase() == useraccount.toLowerCase()){
                         $("#highBidSbelse").hide();
                         $("#highBidYou").show();
                     }else{
                         if(result == nullAddress){
                            $("#highBidSbelseText").html("No bid for now");
                         }else{
                            $("#highBidSbelseText").html("Somebody else is the highest bidder");
                         }
                         $("#highBidSbelse").show();
                        console.log(result);
                        $("#highBidYou").hide();
                     }
                } else
                    console.error(error);
            }
        );
		etherauction.methods.getRemainTime(lastRound).call(
            function(error, result) {
                if (!error) {
                    result = parseInt(result, 10);
                    if(lasttimeout != result){
                        lasttimeout = result;
                        curTimeout = result;
                        $('#bidprogess').val(result);
                    }
					 $("#timeleft").html(toHHMMSS(curTimeout));
                } else
                    console.error(error);
            }
        );
		etherauction.methods.getBalance(useraccount).call(
            function(error, result) {
                if (!error) {
					 $("#userbalance").html(formatWei(result));
                } else
                    console.error(error);
            }
        );
		etherauction.methods.getRoundCount().call(
            function(error, result) {
                if (!error) {
                    result = parseInt(result, 10);
					if(result != lastRound){
                        lastRound = result;
						lastPayCount = -1;
                        refreshWinnerTable(lastRound);
					}
					$("#roundcount").html(result);
                } else
                    console.error(error);
            }
        );
		etherauction.methods.getBidCount(lastRound).call(
            function(error, result) {
                if (!error) {
                    result = parseInt(result, 10);
					if(lastPayCount != result){
						lastPayCount = result;
						refreshPayoutTable(lastPayCount);
					}
					$("#paycount").html(result);
                } else
                    console.error(error);
            }
        );
        ethProv.eth.getBalance(contractadd, function(error, result) {
            if (!error) {
                contractbalance = result;
                $("#balance").html(formatWei(result));
            } else
                console.error(error);
        });
        etherauction.methods.getBid(lastRound, lastPayCount - 1).call(
            function(error, result) {
                if (!error) {
                    $("#highestbid").html(formatWei(result["amount"]));
                } else
                    console.error(error);
            }
        );
    } catch (err) {}
}

function toHHMMSS(secs) {
    var sec_num = parseInt(secs, 10)
    var hours   = Math.floor(sec_num / 3600)
    var minutes = Math.floor(sec_num / 60) % 60
    var seconds = sec_num % 60

    return [hours,minutes,seconds]
        .map(v => v < 10 ? "0" + v : v)
        .filter((v,i) => v !== "00" || i > 0)
        .join(":")
}

function refreshPayoutTable(numOfPayouts) {
	if(numOfPayouts <= 0) {
		while ($('#payoutlist tr').length > 1) {
			$('#payoutlist tr:last').remove();
		}
	}
	
	var listcount = numOfPayouts;
	var lastpayout = listcount - 1;
    var text = "";
    var lastpayout = listcount - 1;
    if (listcount > 5) listcount = 5;
	for (i = listcount - 1; i >= 0; i--) {
        var id = lastpayout - i;
		if($('#tdid' + id).length > 0) continue; 
        $('#payoutlist tbody').prepend('<tr id="tdid' + id + '"><td>' + id + '</td><td>loading...</td></tr>');
    }
    while ($('#payoutlist tbody tr').length > listcount + 1) {
		$('#payoutlist tbody tr:last').remove();
    }

    for (i = 0; i < listcount; i++) {
        sendBidRequest(i, lastpayout - i);
    }
}

function sendBidRequest(payoutid) {
    etherauction.methods.getBid(lastRound, payoutid).call(
        function(error, item) {
            if (!error) {
                var text = "";
                text += "<td class='vright'>" + (payoutid + 1) + "</td>";
                text += "<td class='monospace'>" + "<a href='" + accountlink + item["add"] + "#internaltx' target='_blank'>" + (item["add"] == useraccount ? "Yourself" : formatEthAddress(item["add"])) + "</a>" + "</td>";
                
                //text += "<td class='vright monospace'>" + getDateTimeString(item["timestamp"]) + "</td>";
                var icon = "<img title='Unocked, amount already added to your balance!' src='baseline_lock_open_green_24dp.png' />";
                if((lastPayCount - payoutid + 1) == 2){
                    icon = "<img title='Locked, this amount will unock automatically after 2 more bids' src='baseline_lock_red_24dp.png' />";
                }else if((lastPayCount - payoutid + 1) == 3) {
                    icon = "<img title='Locked, this amount will unock automatically after 1 more bid' src='baseline_lock_red_24dp.png' />";
                }
                text += "<td class='vright monospace'>" + formatWei(item["amount"]) + "</td>";
                text += "<td class='vright monospace'>" + icon + "</td>";
                $("#tdid" + payoutid).html(text);

            } else
                console.error(error);
        }
    );
}

function refreshWinnerTable(numOfRounds) {
    
	if(numOfRounds <= 0) {
		while ($('#winnerlist tr').length > 1) {
			$('#winnerlist tr:last').remove();
		}
	}
	
	var listcount = numOfRounds - 1;
	var lastpayout = listcount - 1;
    var text = "";
    var lastpayout = listcount;
    if (listcount > 5) listcount = 5;
	for (i = listcount; i > 0; i--) {
        var id = lastpayout - i + 1;
		if($('#winnertdid' + id).length > 0) continue; 
        $('#winnerlist tbody').prepend('<tr id="winnertdid' + id + '"><td>' + id + '</td><td>loading...</td></tr>');
    }
    while ($('#winnerlist tbody tr').length > listcount + 1) {
		$('#winnerlist tbody tr:last').remove();
    }

    for (i = 0; i < listcount; i++) {
        sendWinnerRequest(lastpayout - i);
    }
}

function sendWinnerRequest(roundid) {
    etherauction.methods.getWinner(roundid).call(
        function(error, item) {
            if (!error) {
                var rewardPer = item["price"] / item["lastbid"];

                var text = "";
                text += "<td class='vright'>" + (roundid) + "</td>";
                text += "<td class='monospace'>" + "<a href='" + accountlink + item["add"] + "#internaltx' target='_blank'>" + (item["add"] == useraccount ? "Yourself" : formatEthAddress(item["add"])) + "</a>" + "</td>";
                text += "<td class='vright monospace'>" + formatWei(item["lastbid"]) + "</td>";
                text += "<td class='vright monospace'>" + formatWei(item["price"]) + "</td>";
                text += "<td class='vright monospace'>" + formatPercent(rewardPer) + "%</td>";
                $("#winnertdid" + roundid).html(text);

            } else
                console.error(error);
        }
    );
}

function formatWei(wei) {
    var amount = parseFloat(ethProv.utils.fromWei(wei, 'ether'));
    var amountstr = amount.toFixed(9);
    var ret = "";
    var setgray = true;
    if(amountstr == "0.000000000") return "<te class='trans'>0.000000000</te>";
    for (var i = 0; i < amountstr.length; i++) {
        var char = amountstr.charAt(amountstr.length - i - 1);
        if (char == '0' && setgray) {
            ret = "<te class='trans'>0</te>" + ret;
        } else if (char == '.' && setgray) {
            ret = "<te class='trans monospace'>.</te>" + ret;
            setgray = false;
        } else {
            ret = char + ret;
            setgray = false;
        }
    }
    return ret;
}
function formatPercent(per) {
    per = per * 100;
    var amountstr = per.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0});
    return amountstr;
}
function formatEthAddress(address){
    if(!address.startsWith("0x")) return address;
    if(address.length != 42) return address;

    var len = 4;
    return address.substr(0, len + 2) + ".." + address.substr(address.length - len);
}

function payoutclick() {
    ethProv.eth.sendTransaction({
        value: 0,
        to: contractadd
    });
}

function htmlEncode(value) {
    return $('<div/>').html(value).html();
}

function getDateTimeString(unixtimestamp){   
    // Months array
    var months_arr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var date = new Date(unixtimestamp*1000);
    var year = date.getFullYear();
    var month = months_arr[date.getMonth()];
    var day = date.getDate();
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var seconds = "0" + date.getSeconds();
   
    var convdataTime = day + "." + date.getMonth() + "." +year + " " + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    
    return convdataTime;
    
   }

function getGradientColor(start_color, end_color, percent) {
    if(percent > 1) percent = 1;
    if(percent < 0) percent = 0;
    // strip the leading # if it's there
    start_color = start_color.replace(/^\s*#|\s*$/g, '');
    end_color = end_color.replace(/^\s*#|\s*$/g, '');
 
    // convert 3 char codes --> 6, e.g. `E0F` --> `EE00FF`
    if(start_color.length == 3){
      start_color = start_color.replace(/(.)/g, '$1$1');
    }
 
    if(end_color.length == 3){
      end_color = end_color.replace(/(.)/g, '$1$1');
    }
 
    // get colors
    var start_red = parseInt(start_color.substr(0, 2), 16),
        start_green = parseInt(start_color.substr(2, 2), 16),
        start_blue = parseInt(start_color.substr(4, 2), 16);
 
    var end_red = parseInt(end_color.substr(0, 2), 16),
        end_green = parseInt(end_color.substr(2, 2), 16),
        end_blue = parseInt(end_color.substr(4, 2), 16);
 
    // calculate new color
    var diff_red = end_red - start_red;
    var diff_green = end_green - start_green;
    var diff_blue = end_blue - start_blue;
 
    diff_red = ( (diff_red * percent) + start_red ).toString(16).split('.')[0];
    diff_green = ( (diff_green * percent) + start_green ).toString(16).split('.')[0];
    diff_blue = ( (diff_blue * percent) + start_blue ).toString(16).split('.')[0];
 
    // ensure 2 digits by color
    if( diff_red.length == 1 ) diff_red = '0' + diff_red
    if( diff_green.length == 1 ) diff_green = '0' + diff_green
    if( diff_blue.length == 1 ) diff_blue = '0' + diff_blue
 
    return '#' + diff_red + diff_green + diff_blue;
  };
  function getGradientColors(start_color, end_color, percent){
    var c = 5;
    var ret = "";
    for(i = 0; i < c; i++){
        if(ret.length > 0) ret += ",";
        var per = percent + (i - c / 2) / c * 0.4;
        ret += getGradientColor(start_color, end_color, per);
    }
    return ret;
  }
