export function Card({ title, value }: { title: string; value: string | number }) {
    return (
        <div className="card">
            <h4>{title}</h4>
            <p>{value}</p>
        </div>
    );
}