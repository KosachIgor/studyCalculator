import { useState } from "react";
import styles from "./App.module.css";
import { Box, Text, Button } from "@chakra-ui/react";

function App() {
    const [counts, setCounts] = useState("0");
    const [result, setResult] = useState("");

    const applyExpression = (countedNumber) => {
        setCounts(countedNumber);
        setResult(eval(counts));
    };

    const CountButton = (props) => {
        const expressions = /\+|\-|\/|\*| /;
        const lastNumber = props.data[props.data.length - 1];
        const checkExpressionType = () => {
            if (expressions.test(lastNumber)) return;
            props.onClick(props.data + props.expression);
        };
        return (
            <Button
                onClick={() => {
                    checkExpressionType();
                }}
            >
                {props.expression}
            </Button>
        );
    };

    const Numbers = (props) => {
        const nums = ["9", "8", "7", "6", "5", "4", "3", "2", "1", "0"].map(
            (number) => {
                return (
                    <Button
                        className={styles.btn}
                        key={number}
                        onClick={(e) => {
                            if (props.data != "0")
                                props.onClick(props.data + e.target.innerHTML);
                            else props.onClick(e.target.innerHTML);
                        }}
                    >
                        {number}
                    </Button>
                );
            }
        );
        return <Box className={styles.btnBlock}>{nums}</Box>;
    };

    return (
        <div className={styles.App}>
            <Box className={styles.wrapper}>
                <Box className={styles.container}>
                    <Box className={styles.input}>
                        <Text className={styles.inputText}>{counts}</Text>
                        <Text className={styles.resultText}>{result}</Text>
                    </Box>

                    <Numbers data={counts} onClick={setCounts} />
                    <Box className={styles.exprBtn}>
                        <CountButton
                            data={counts}
                            expression={"+"}
                            onClick={applyExpression}
                        />
                        <CountButton
                            data={counts}
                            expression={"-"}
                            onClick={applyExpression}
                        />
                    </Box>
                    <Button
                        className={styles.evBtn}
                        onClick={() => {
                            setResult(eval(counts));
                        }}
                    >
                        =
                    </Button>
                    <Button
                        className={styles.evBtn}
                        onClick={() => {
                            setCounts("0");
                        }}
                    >
                        C
                    </Button>
                </Box>
            </Box>
        </div>
    );
}

export default App;
