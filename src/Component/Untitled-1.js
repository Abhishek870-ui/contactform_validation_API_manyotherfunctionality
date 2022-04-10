// dynamic input field
var array = [
    {
        class: '',
        percentage: '',
        subjects: ''
    },
    {
        class: '',
        percentage: '',
        subjects: ''
    }
]
// const [cc, setCC] = useState(array)


edit
data get in backend by innerrjoin
data backend -> frontend as object array
[{
    ......
},
{
    ...
}]

this data iterate by foreach and set the data into state



let arr = []
api Response
arr = (response.data)



let arr = []
var array = [
    {
        "class": 'ba',
       " percentage": '80',
        "subjects": 'pcm',
        fname:"abcd"
    },
    {
        class: '12',
        percentage: '81',
        subjects: 'ehs',
        fname:"abcde"

    }
]
array[0].subject,
let arr = [array.push(array[0].subject,array[0].percentage,array[0].class)]



<script>
let arr = []
var array = [
    {
        "class": 'ba',
       "percentage": '80',
        "subjects": 'pcm',
        "fname":"abcd"
    },
    {
        "class": '12',
        "percentage": '81',
        "subjects": 'ehs',
        "fname":"abcde"

    }
]
for(i=0;i<array.length;i++)
{

arr.push(array[i].class,array[i].percentage,array[i].subjects);
}
console.log(arr)
</script>