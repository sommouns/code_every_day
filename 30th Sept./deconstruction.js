{
  let a, b
  [a, b] = [1, 3, 5]
  console.log(a, b)
}

{
  let a, b
  [a, ...b] = [1, 2, 3, 4, 5]
  console.log(a, b)
}

{
  let Student = {name: 'tim'}
  const { name } = Student // 通过新对象来实现对象给对象赋值
  console.log(name)
}

{
  let metaData = {
    title: 'this is title',
    content: [
      {
        title: 'this is content title',
        desc: 'this is contnet desc'
      }
    ]
  }
  let {title: estitle, content: [
    {title: estitle2}
  ]} = metaData
  console.log(estitle, estitle2)
}