

var RangeInput;
RangeInput = (function(){
    function RangeInput(){
        this._multiple = false;
        this._init();
    };
    
    RangeInput.prototype._init = function() {
        var self = this;
        
        var sheet = document.createElement('style'),  
            $rangeInput = $('.range input'),
            prefs = ['webkit-slider-runnable-track', 'moz-range-track', 'ms-track'];
        
        document.body.appendChild(sheet);
        
        var getTrackStyle = function (index) {  
            var style = '';
    
            var cur_label = $('.range-labels').find('li:nth-child(' + index + ')');
            
            if (self._multiple === true && index > 1 && index < 8){
                var old_first_index = $('.range-labels li.active').first().index() + 1;
                var old_last_index = $('.range-labels li.active').last().index() + 1;
                var new_first_index = 1;
                var new_last_index = 1;
                var selected_indexes = [old_first_index, old_last_index];
                
                function closest(array,num){
                    var i=0;
                    var minDiff=1000;
                    var ans;
                    for(i in array){
                         var m=Math.abs(num-array[i]);
                         if(m<minDiff){ 
                                minDiff=m; 
                                ans=array[i]; 
                            }
                      }
                    return ans;
                }
                
                if (old_first_index !== old_last_index){
                    if (closest(selected_indexes, index) === old_first_index){
                        new_first_index = index;
                        new_last_index = old_last_index;
                    }
                    if (closest(selected_indexes, index) === old_last_index){
                        new_first_index = old_first_index;
                        new_last_index = index;
                    }
                } else {
                    if (index < old_first_index){
                        new_first_index = index;
                        new_last_index = old_first_index;
                    } else {
                        new_first_index = old_first_index;
                        new_last_index = index;
                    }
                }
                
                console.log()
                
                $('.range-labels li').removeClass('active selected');
                for (var i = new_first_index; i < new_last_index; i++) {
                    var elem = $('.range-labels').find('li:nth-child(' + i + ')');
                    
                    $('.range-labels').find('li:nth-child(' + i + ')').addClass('selected');
                }
                $('.range-labels').find('li:nth-child(' + new_first_index + ')').addClass('active selected');
                $('.range-labels').find('li:nth-child(' + new_last_index + ')').addClass('active selected');
                
                var last_index_width = (new_last_index - 1) * $('.range-labels li').first().width();
                var first_index_width = (new_first_index - 1) * $('.range-labels li').first().width();
              
                style += '.range-line:after {width: '+ last_index_width +'px;}';
                style += '.range-line:before {width: '+ first_index_width +'px;}';
                
                $rangeInput.val(new_first_index + ',' + new_last_index);
            } else {
                $('.range-labels li').removeClass('active selected');
                cur_label.addClass('active selected');
                
                if(index === 1 || index === 8){
                    $('input[name=add-variant]').prop('checked', false);
                    self._multiple = false;
                }
                $rangeInput.val(index);
            }
        
            return style;
        }
        
        // Change input value on label click
        $('.range-labels li').on('click', function () {
          var index = $(this).index();
          sheet.textContent = getTrackStyle(index + 1);
          
        });
    };
    
    RangeInput.prototype.setMultiple = function(multiple) {
        this._multiple = multiple;
    };
    
    return RangeInput;
})();