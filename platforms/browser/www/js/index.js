/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var androidApplicationLicenseKey = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtrOQsWiUYfQ65MjUam2zu2DgoBkOsaoelFQHWzRkAT+KHr1xPIOF5JUeQs/XWtNjRI4pavBrRveB3xnoKE+WxvILh4N+3Kl11/i0r9B6/LBae8V8WZpArEIIvh3rgowDGTO0B6sfWO71iP9EStmwziBI4sDOMuPensBSmj8bxj3hhNEzyRJvQbybdNgAD2xoy55+S0kgLHE3PbZwqogJf1pPIGSmhC2SXSrMXoJzxeMxM8/hN7VoVj9VAJxzOE3zR9he9npiDWGLsPnAIXggUN9Ys0h80YjwRl7GHLP0P/itBo28w4+qOqz2E34SFFInAqX7evtrMu3AkfYcX+FPuQIDAQAB";
var productIds = "subs_paket_islam,subs_paket_ihsan,subs_paket_iman";
var existing_purchases = [];
var product_info = {};
        

var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
        //navigator.notification.alert('a');
        this.initStore();

        setTimeout(function(){ 
            window.location.href = "iframe.html"; 
        }, 3000);
    },

    initStore: function(){
        //alert(androidApplicationLicenseKey+' - '+productIds);
        window.iap.setUp(androidApplicationLicenseKey);
        window.iap.requestStoreListing(productIds, function (result){
                console.log(JSON.stringify(result));
            }, function (error){
                console.log("error: "+error);
        });
    },


    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

function purchase(productId) {
    window.iap.purchaseProduct(productId, function (result){
        navigator.notification.alert("Pembayaran behasil, kirimkan konfirmasi segera.");
    }, 
    function (error){
        navigator.notification.alert("Terjadi kesalahan pembayar, kami sarankan untuk melakukan transfer bank: "+error);
    });
}

function consumeProduct(productId) {
    //navigator.notification.alert(productId);
    //consume product id, throw away purchase product id info from server.
    window.iap.consumeProduct(productId, function (result){
        navigator.notification.alert("Active!");
    }, 
    function (error){
        navigator.notification.alert("Not-Active");
    }); 
    
}

function restorePurchases() {
    //get user's purchased product ids which purchased before and not cunsumed.
    window.iap.restorePurchases(function (result){
        for (var i = 0 ; i < result.length; ++i){
            var p = result[i];
            
            if (self.existing_purchases.indexOf(p['productId']) === -1)
                self.existing_purchases.push(p['productId']);           

            alert("productId: "+p['productId']);
        }
    }, 
    function (error){
        alert("error: "+error);
    });
}

app.initialize();