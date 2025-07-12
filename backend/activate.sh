source ./.venv/bin/activate
if [ $? -ne 0 ]; then
    echo "Failed to activate virtual environment. Please check if the .venv directory exists."
    sudo apt install python3.12-venv
    python3 -m venv .venv
    source ./.venv/bin/activate
    if [ $? -ne 0 ]; then
        echo "Failed to create and activate virtual environment."
        # exit 1
    fi
    # exit 1
fi
