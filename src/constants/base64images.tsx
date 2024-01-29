import React from "react"

const size = "30px";
const ImageStyle: React.CSSProperties = {
    width: size,
    height: size,
    filter: "brightness(0) invert(1)", 
}

const Image = (props: {src: string}) => {
    return <img style={ImageStyle} src={props.src} />
}

const base64s = {
    "chart": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFD0lEQVR4nO2bXYxdUxTHfx0zmipTVAhR1ZpiUhKE8dX61gdvUsIDQggNFUolqAivEm+Ij2qQaD0QxDQehKbNRKSIKVGJGRoflYhotTPMbU1VlqyTrKycc++59+x97rlj/slO5mPttddeZ+291l57bag+uoGjgBn8z3AW8A7wF3AQGAMGgRuBWUxxXA/s04mntT3Ai8ACOgAz1IR7ctL3AzU34bEMRewHngfmUTEcCdwKbDTCiym/q6ZdD6+YCY4Ai/Xv84FHge0pihDeq4Au2ox+/SJ/1jFfMe3r6vDYaWiXZtAsAT5M4b0JOJk2YD7wGnAgY9J73e8TwGkZvCyPRsvmcuBzx/sP4EpKdFEP64T8pD9Ts5xnrONb8/91GTwtjzwQJT0B/O2s7CYiYyGw1Qn8D/A2cHFGn0sM7c+BFJDgXOAHJ4t8gCi4BtjlhP0EuDDH10roxdRDKkBwAjDslBDcEu4AJt16Xg0ckrN/owkWUYCgVzdDuxyuIhDuV60mzHcA5zTJI7YCEiUMu42xsHe4zU1eTH5uC3zKUECyHOyesKlInLDM7bLC7PAWeZWlgGRjtHK3tCmeCPzm3NsRBYQqUwGoi7QRo8wnN7qALYbBj8CxBQUqWwE9LliSSDU37nUHjyz/XmUFCK5w85AYpiGOdyHs44GEaYcCBB8Zvi/k6fCc6fAlcGiHK2CpyyfUTaosUFNJOlwdUJB2KUDwjeEtmaVMPG0I5djJFFHAGsNb0mupmA3sNoQSA4REownaMDvUsrOWnfAezwqMbjBE2yNkYxspwCZEJJAJDRsYzUkjeMsQSAqKkhWwwfz/vcBjn2d4S9aqKy1osAnIUylfAUscjazVAWBmgTFlXpcBo4bvm2mEFxiC74iDPJvcs44udJMj8hlpAz+YI2VVhgK6IypBzgPLswZ+2RDeE2f+Tbk5Cb3XAz8579BsO6A81jVa1kOmU7AsSol+vjC+N8KdEmkM+yWLbGxRsNsId3SkMayfF7dUKUwa4WQjioENecLRdqFWgnl6Py/3h+dXZTnsNYJJZjUWYvv5g5rA3amXrXIrlQs7DIO+iAqI6efTWk1rDhpiyHSS0DE2Qvn5PE3yG2c2Emi96XAnnY0ezQLZC1k56NXFQ4b4JaYGzm50AvT37QnxV0wd7Mu7uc92d/1tqbYIjJPMfMbyJHg2mg730flY3WzgdZfpIDesnQ57S3xL3gqvcdPpIjoXlzrzzx3crY2YlysTg2YezzTTcbGr1pJUWSd//clW8puvGwZbmyiBqQK63Y2wZLqaRp9zidEqriLgESP3eJFS2jWG0YRGVVXHgDvWP1A0nh42zEa18LmqOE4PVom8H4dYun1aZWWLoyRirBp6tXwnkfP3kJHstc4rvA8cRnUwxx3l98fIaq905+uhiiwHKYfb5jJBN8ca7DGnhNEc9f8xIef9X4w8YqUrYg+60i2HCXWRZcYJkkB9MqVCPNqXT9sT9jhr+DRHsXSoQm3/auRXrUQvFYuAL1Jyb4OByuksunTim1PG+6DZ4seQ6NEiiuRpm23btLi6yMuu07U8bySFv5Tr312V94QL9clMVmb3a43HV2jabZF6kJn6defq35ZpcearLkVvW01PdsdQQfRrEWLWM7ciTeqVn9ICzsqjF7hdn8nVe0HWqMll7Rt6qVGJq7NWMEvvA1epaW/R8ptdGrTU9OcRrUlcq8UZAxEvaKcxjWnwH/4FIa4A66MQ/Q4AAAAASUVORK5CYII=",
    "fire": "data:image/png;base64,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",
    "homepage": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAACKklEQVR4nO2Yz0tVQRTHP0JakbXoB9QiaCNChPWgZYu3SKNw5d+gLnUpGEjLwBYuWrQI2rhs5y5CnyVFCa4jUAoxLBfiw4Wm+WLoXBgO0/OOb+Z2q/nA2dw58z3ne+/M3PseJBKJxL/ISeARsAF8Aybl2l/BJeAd0FCxBFym5PQAnxzNZ7EG3KSkDADbVrN7wIjEnnV9W3JdXAFuA7eAjqIabwPGgQOryU2g18rplWvZ+IHMabNyqsroiyKaPwFMq2XyEeh25HbLmJ07LRqGCTX2I3bz54F5VfQ1cKHJnLPASzXnLXAReODYM9G4DnxWxZ4A7TnmtkuuPddoPS/KwF1gyyqyD4wdQWcY+N7kxIpiYFTWZlagDvS3oNenNnc0A+ZIe6bEl4GrAbS7gA8xDZhNuaCEa8C5UAX4pVVzGGh2IOTiGrCiRJ9GeskcAx6rWqtApZX1WS/yaBN0vbr04s2Xok4Ghaum6cWbNzJZL6HYNKzIaps96M1peXSdf9DAGeCO9BBMNDaNGLX+GwOngCH5tHDFoOSEqOVFHlFzji8e8m1j4r3ktlLLmzyilRzNZ1Epo4GqlbMOPFTx1Rqvlt3AnGPcXEsGjkp6AqQlFG4JdUTcxMdjnUI7luj4b0zc8zBgcjVG876VY2oG45XHS8rErENj1lOjFtKAeXPuehSfcmhMeczfBW6ENJCZmFfLyVV4Rv6Bc/1wnznkRuzInQ/efCKRSCQSlJGfzJeMUP7NW3sAAAAASUVORK5CYII=",
    "alarm": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAD5klEQVR4nO1YWUgVURj+zMyutlJRmSJFRWVRBCEV9FBPWZBkWr1klEVUGgRhb5VB21NEL0ULRJRBQftDaRFBGy22vohtpr203koTUuO3b+DnNDP3zp3rcmE+GLjnO9/855w75/zLAQIECBAgwD/0AbAXQCOABgC7ySUc9gBoN55dSEA0cPKzAMzmb+G6BPMAhOJky/oKTm0/CAGY69Q5EsAvALUA0n0MMhrAZjXx7wC+qPZqAIN92E/nHH8CGGEnOMiBzvpYgLzbanM2zKcZwD4Ag2Ic6xztHDA7hgNoAfAHwETFLwOwCUByBMOL+Q+186seBpAPIBtAGp9scoeoEW0dgKkRbCdzDjIXC5M4198AhmlxGQ2fV1xfAO/IL3IZaKH6CqecPrcB0ZzmO18BTHHR5lP3FkCq4i+S36jF90kWKm4DuUcAejkMMhbAN+oq4A1JAHbyXfnD+jvoZOwn1K1T/FJydy0iSx1K7bEeki9wmUwlNZWcmFck8VyJjf0uukJqHiguxDm3AcjUosvGHhTuk0s0Hs8t1USPFysyudfFzhAHTaryfBMUf4XcEtB7SGObEpSSO+oygS3UHIF/nLDb7waO22i2k5NUCNVs5CnBSXIlcMa1KLZetFgehetfS40sWjsa4aqk8YIN2U4WnpGb5mK4jhqJH34xTrljJ0ynpkZxk8nJGvCRDe027TgTVtzwkwVYGEBbYRdNBjUfbLiOHK6JDe2xLE5iiRPimTtFYy/E/iYnrtlm0naL8zqwV0Syl85+2QkW0vRCGtnQLrSeXKaPgb0ikr1sFTwtjNLbzTrsOUrwmFyuj4G9IpK9meyXQG0e9ueg6zLd7zFypT4G9opI9sps4pblfq+DwcQMiGtU6hHrwF4Ryd4ZVc9Y2EFOyuqO8N7OcG9hDHOYHy7utSsX0o9zaTPi1lUdlLMoMJPG2xStiGHgWOBmbyX7bhkeK6yTRsE9CouUcJU6SGYaP5R9n+O4EPkjxeZAm8LqJfuKbdL4O3YH6YLiJOt9TV4qQI055MW7xQuW95xh8AUqfUlR/CXyUjfZlro65yriIns73Fm51RBeISWw6XTAscuM3ZLDEuK/UldfPkhh74YUdWfleCUTA+bTZr1R0nq6fPByHVRMI69irAqdIOewlrbX+7kOiuaCTvKxNzYHL14ooe33ERJW1wu6aGAFz6dRXBHFgmRVC3VUfZ2BXDqDVt7lJuw4NSpoddVT0xkLudkNC7mBbkSYk5Ay1IRVP8ilXo9HNSdbbtO3Vd969HQs4GRbuJgMPuXk2hn8EgIVLvteaoiEQh63UJhPVSJ9iQABAgRAp+IvTmWYETv6gIMAAAAASUVORK5CYII=",
    "settings": "data:image/png;base64,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", 
    "shortcuts": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAD2UlEQVR4nO2ZS2hVRxzGf01qrBofWC2INmIQBNMWFdpCF1URdFe0ahBfCD6KqbTGjVmpqzYIFVwI6kJKTXTV1i6ki+6r+EBMjPHRbGwbbE2FkpgYX1cGvgN/LveeOY977skiHwxcznzzf9wz8//mzMA4xpEb6oBm4BxwBxgCChm3IfnqlG8XQyp8DvRVIXBf+wNYlySBGuCoMXQT+ApYDEwhe0wBmoCvgS4TR7tii4wgiafAF3EHVxg1wF7FEiQTeToFSSxn7GCFSWatj1xn1oR7E2MNLYrtPjAhjNhs1kSa6fQWcAC4Cgyrud+t6kuKWqBbMW4II54TyS3spHgf6A2pQL3iJMV+2ekII90VyVWnJNhidKZX/9ostY3AbfU9AbYm9NEkG05nymJQpPqYxt9UNQn+9R+AySV4blqdNrxTwMSYvqZqrIu1LAIHcTAP+N1UOlf7fdiut+LGXAcWxPRZ8MUZNxFXEh9qzAPg4xhjl5oKOQCsySORN4CDwAvxLwIziY/pwE+y8SqGclckkWkJnVfyTymkTaTRTIdHMaeDD87WI9nuk6+kcXoJv6j/CtBA5dEg287HhRRxegkD6ve9+kkplP1t88aTxukl3FB/Wwjng5TK3mbKcmaJNGuBO87JEhs3qw+llD1IcEi7AAtn66QpIuuzTAQFNCzeb8AMPZ8D/K3n32t6FcM9O2P8nNCOe4ZsFWTb+aiKjnwI9Jt/fqFR+W0Rxu8CRjT+snlT/bJdVWV/t0iZPyUelgF/GZ/OlrOZq7K7NgrsIDo2mbeSi7LPlPo63kvgEPCdGfutJ5gacQL+MeCwbBXyUvbVpm838Ex9P5Y5bZmsvoK4e4qUfcBMswV5Kvsq4LE491R93lFr1rOCOI5bjPlG2X/OW9kXAT0hgtgjjk/Z/81b2QO92K/SOqR2SR9dvi1Km3xcq6ayu0/cSqHqyr7ebEOssqfBVFMJR4DN1dKRJcCf5rAsbM770GhOV/qBj6qt7HM1jx3/P32/x8UnwD+y4Q6rXdWi2omgY6MLFVD2X/UJTV6JBNuVI2bscY+yl+K7o9A48MaZ9IDOYWeRspc7oDsvznPgywR+pmn8/1kemZZS9tlG2e97lD0K3otyZNopUpTTwqyU3YdW2Tkb5VqhK+VZVRplD4NbS7eiXCvU6eKxoOuusYZ9ZtqGXvSg29PgQDqJNmSFlSrxbvvyWdRB7SaZlgTlsZKo1ZsYVUzfxBlcU3Tf0a0535SwNMdFvapTq1kTr5REorW71pTMPNu9ONOpHCaoQnTo2CYQzSzboDaSZ+Xbu7DHMQ6ywWtk2y9Osdf+/AAAAABJRU5ErkJggg==",
}

export const ChartImage = () => {
    return <Image src={base64s.chart} />
}

export const FireImage = () => {
    return <Image src={base64s.fire} />
}

export const HomePageImage = () => {
    return <Image src={base64s.homepage} />
}

export const AlarmImage = () => {
    return <Image src={base64s.alarm} />
}

export const SettingsImage = () => {
    return <Image src={base64s.settings} />
}

export const ShortcutsImage = () => {
    return <Image src={base64s.shortcuts} />
}